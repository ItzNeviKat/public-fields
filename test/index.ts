import { PublicField, extractPublicFields } from '../src';

class Test2 {
    @PublicField({ condition: 'field1' })
    public publicField1 = 'foo';

    @PublicField()
    public publicField2 = 'bar';

    public privateField1 = 'baz';
}

class Test {
    @PublicField({ condition: 'field1' })
    public publicField1 = 'foo';

    @PublicField({ condition: 'field2' })
    public publicField2 = 'bar';

    @PublicField()
    public publicField3 = new Test2();

    public privateField = 'baz';
}

const test = new Test();
const testPublicFields = extractPublicFields(test, { field1: true, field2: false });

console.log(testPublicFields)
