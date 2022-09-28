//required Employee Class
const Employee = require('./Employee');

//create Intern class 
class Intern extends Employee {
    constructor(id, name, email, school) {
        super(id, name, email);
        this.school = school;
    }
    //function to return school name
    getSchool()
    {
        return this.school
    }
    //override Role function
    getRole()
    {
        return "Intern";
    }
}

//export the class
module.exports = Intern;