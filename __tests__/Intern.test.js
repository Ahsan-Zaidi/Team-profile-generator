const Intern = require('../lib/Intern');

//test to set school value into contructor object
test("Can set the school via constructor", () => {
    const testValue = 'Utsa';
    let e = new Intern(6, "John", "john@gmail.com", testValue);
    expect(e.school).toBe(testValue);
});

//test role function to return Intern object
test("getRole returns Intern", () => {
    const testValue = "Intern";
    let e = new Intern(4, "preach", "preach@gmail.com", "Utsa");
    expect(e.getRole()).toBe(testValue);
});

//test to get school from function
test("can get school via the constructor", () => {
    const testValue = "BYU";
    const e = new Intern(9, "preach", "preach@gmail.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});

