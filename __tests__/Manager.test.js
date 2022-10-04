import Manager from '../lib/Manager.js';

//check if office number is taken into database
test('Can set office number with contructor argument', () => {
    const testValue = 205
    let e = new Manager(8, "Ribby", "ribby@gmail.com", testValue);
    expect(e.officeNumber).toBe(testValue);
});

//test getrole function to get manager
test("getRole will return \"Manager\"", () => {
    const testValue = "Manager";
    const e = new Manager(5, "Ribby", "ribby@gmail.com", 300);
    expect(e.getRole()).toBe(testValue);
});

//test to get Officenumber from function
test("will getOffice return officenumber", () => {
    const testValue = 450;
    const e = new Manager(8, "Ribby", "ribby@gmail.com", testValue);
    expect(e.getOfficeNumber()).toBe(testValue);
});