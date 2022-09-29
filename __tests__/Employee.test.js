const Employee = require('../lib/Employee');

//test to check if employee object is passed
test('Can Create an Employee instance', () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
});

//test to check if id is passed
test('Can set id w constructor arguments', () => {
    testId = 5;
    const emp = new Employee(testId);
    expect(emp.id).toBe(testId);
});

//test to make sure Id is passed as a integer only
test('Id must be numbers only', () => {
    const emp = new Employee(5);
    expect(emp.id).toEqual(expect.any(Number));
});

//test to make sure name can be passed as contructor argument
test('can set name via constructor arguments', () => {
    testValue = "Ichigo";
    const emp = new Employee(5, testValue);
    expect(emp.name).toEqual(testValue);
});

//test to set email through constructor argument
test('can set email via constructor argument', () => {
    const testValue = "Naruto11@gmail.com";
    const emp = new Employee(4, "Naruto", testValue);
    expect(emp.email).toBe(testValue);
});

//test to check if email input is a string
test('check is email is a string', () => {
    const testValue = "Nami100@gmail.com";
    const emp = new Employee(3, "Nami", testValue);
    expect(emp.email).toEqual(expect.any(String));
});

//test getId function if returns id
test('can pull id from function getId', () => {
    const testValue = 7;
    const e = new Employee(testValue);
    expect(e.getId()).toBe(testValue);
});

//test to see if Id passed is number only
test('check if id passed is integer', () => {
    const emp = new Employee(6);
    expect(emp.getId()).toEqual(expect.any(Number));
});

//test function getName to see if name is pulled
test('can get Name value from function getName', () => {
    const testValue = "Luffy";
    let e = new Employee(8, testValue);
    expect(e.getName()).toBe(testValue);
});

//test to see if function returns getEmail
test('can getEmail return the correct email', () => {
    const testValue = "LuffyG1@mail.com";
    let e = new Employee(8, "Luffy", testValue);
    expect(e.getEmail()).toBe(testValue);
});

//email validation string ONLY
test('does email value return a string', () => {
    const testValue = "LuffyG1@gmail.com";
    let e = new Employee(8, "Luffy", testValue);
    expect(e.getEmail()).toEqual(expect.any(String));
});