const Employee = require('./Employee')

class Engineer extends Employee {
    //Employee constructor with added Engineer parameter
    constructor (id, name, email, github) {
        super(id, name, email);
        this.github = github;
    }
    //function to get github name
    getGithub()
    {
        return this.github;
    }
    //Overridden function
    getRole()
    {
        return "Engineer";
    }
}

//export the class
module.exports = Engineer;