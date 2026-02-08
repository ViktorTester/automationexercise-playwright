export const numberInputCases: NumberInputCase[] = [
    {
        title: "Empty value",
        value: '',
        expectedValue: '',
    },
    {
        title: "Zero value",
        value: '0',
        expectedValue: '0',
    },
    {
        title: "Valid value",
        value: '12345698',
        expectedValue: '12345698',
    },
    {
        title: "Float value",
        value: '0.9',
        expectedValue: '0.9',
    },
    {
        title: "Negative value",
        value: '-1',
        expectedValue: '-1',
    },
    {
        title: "Big negative value",
        value: '-' + ('9'.repeat(308)),
        expectedValue: '-' + ('9'.repeat(308)),
    },
    {
        title: "Max value",
        value: '9'.repeat(308),
        expectedValue: '9'.repeat(308),
    }
];