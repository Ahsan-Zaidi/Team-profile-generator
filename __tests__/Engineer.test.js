import Engineer from '../lib/Engineer.js';

//test to check if github account is added by constructor
test("Can set github account via the contructor", () => {
    const testValue = "GithubUser";
    const e = new Engineer(4, "Ahsan", "Ahsan@gmail.com", testValue);
    expect(e.github).toBe(testValue);
}) ;

//test if function will return engineer object
test("getRole should return Engineer \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer(1, "Aba", "Aba@gmail.com", "GithubUser");
    expect(e.getRole()).toBe(testValue);
});

//test to retrieve github username
test("can get username from getGithub", () => {
    const testValue = 'GithubUser';
    const e = new Engineer(2, "ABA", "Aba@gmail.com", testValue);
    expect(e.getGithub()).toBe(testValue);
});