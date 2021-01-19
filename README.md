# public-fields
 A module that allows transform class to object with public fields and conditional fields

# Installation
You can install this module via npm:
```shell script
npm install public-fields --save
```
or via yarn:
```shell script
yarn add public-fields
```

# Usage
## Basic usage
To declare public field you need to use decorator `@PublicField()` before field:
```typescript
class Test {
  @PublicField()
  somePublicField: string = 'hello world';

  somePrivateField: string = 'bye world';
}
```
And transform object:
```typescript
const test = new Test();

const result = extractPublicFields(test);
console.log(result); // => { somePublicField: 'hello world' }
```

## Conditions
There are situations where field will be public only if some condition is true. For this, you can use `options.condition` in decorator options and pass condition result to `args` of `extractPublicFields`:
```typescript
class Test {
  @PublicField({ condition: 'isMySecretField' })
  someSecretField: string = 'very secret';

  @PublicField()
  somePublicField: string = 'hello world';

  somePrivateField: string = 'bye world';
}

const test = new Test();

const result1 = extractPublicFields(test);
console.log(result1); // => { somePublicField: 'hello world' }

const result2 = extractPublicFields(test, { isMySecretField: true });
console.log(result1); // => { somePublicField: 'hello world', someSecretField: 'very secret' }
```

## Classes in class
There are an example of working with classes in class:
```typescript
class Test2 {
    @PublicField()
    somePublicField2: string = 'hello world 2';

    @PublicField({ condition: 'isMySecretField' })
    someSecretField2: string = 'very secret 2';
}

class Test {
  @PublicField({ condition: 'isMySecretField' })
  someSecretField: string = 'very secret';

  @PublicField()
  somePublicField: string = 'hello world';

  @PublicField()
  testField: Test = new Test();

  somePrivateField: string = 'bye world';
}

const result1 = extractPublicFields(test);
console.log(result1); // => { somePublicField: 'hello world', testField: { somePublicField2: 'hello world 2' } }

const result2 = extractPublicFields(test, { isMySecretField: true });
console.log(result1); // => { somePublicField: 'hello world', someSecretField: 'very secret', testField: { somePublicField2: 'hello world 2', someSecretField2: 'very secret 2' } }
```

## Why is it needed?
The idea of this module came to mind when it was necessary to describe the `TypeORM` model and at the same time return the document to the `API` user, but with defined fields.
I imagine this description of the `TypeORM` model:
```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PublicField } from 'public-fields';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @PublicField()
  id: number;

  @Column()
  @PublicField({ condition: 'isOwn' })
  money: number = 0;

  @Column()
  @PublicField({ condition: 'isOwn' })
  timestamp: number = Date.now();

  @Column()
  reportsCount: number = 0;
}
```
