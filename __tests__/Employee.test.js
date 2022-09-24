const Employee = require('../lib/Employee');

test('Can Create an Employee instance', () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
})