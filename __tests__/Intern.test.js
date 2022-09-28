const Intern = require('../lib/Intern');


test('Can set the school via constructor \'Intern\'', () => {
    const testValue = 'Utsa';
    let e = new Intern(6, "John", "john@gmail.com", testValue);
    expect(e.school).toBe(testValue);
});

test('')