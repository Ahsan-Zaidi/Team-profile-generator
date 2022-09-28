const Employee = require('../lib/Employee');

//test to check if employee object is passed
test('Can Create an Employee instance', () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
});

test('Can set id w constructor arguments', () => {
    testId = 5;
    const emp = new Employee(testId);
    expect(emp.id).toBe(testId);
})