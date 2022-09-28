const Manager = require('../lib/Manager');

//check if office number is taken into database
test('Can set office number with contructor argument', () => {
    const testValue = 205
    let e = new Manager(8, "Ribby", "ribby@gmail.com", testValue);
    expect(e.officeNumber).toBe(testValue);
})