import { PublicField, extractPublicFields, extractPublicFieldsFromArray } from '../src';
import { OnExtracting } from '../src/OnExtracting';

class Test2 {
    @PublicField({ condition: 'field1' })
    public publicField1 = 'foo';

    @PublicField()
    public publicField2 = 'bar';

    @PublicField()
    public num: number;

    private privateField1 = 'baz';

    constructor(num?: number) {
        this.num = num;
    }
}

class Test {
    @PublicField({ condition: 'field1' })
    public publicField1 = 'foo';

    @PublicField({ condition: 'field2' })
    public publicField2 = 'bar';

    @PublicField()
    public publicField3 = new Test2();

    @PublicField()
    public publicField4: Test2[] = [new Test2(2), new Test2(1)];

    public privateField = 'baz';

    @OnExtracting()
    public onExtracting() {
        return {
            ...this,
            publicField4: this.publicField4.sort(
              (a, b) => a.num - b.num
            )
        };
    }
}

// Simple test
const test = new Test();
const testPublicFields = extractPublicFields(test, { field1: true, field2: true });
console.log(testPublicFields);

// Array test
const testArray: Test2[] =
    new Array(10)
        .fill(undefined)
        .map(() => new Test2());
testArray[3].publicField2 = 'no';

const testArrayPublicFields = extractPublicFieldsFromArray(
    testArray,
    { field1: false },
    (item) => item.publicField2 === 'bar' && { field1: true });
console.log(testArrayPublicFields);
