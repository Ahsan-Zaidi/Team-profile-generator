//import required Employee class
import Employee from './Employee.js';

//Extend Employee class including Manager
class Manager extends Employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        this.officeNumber = officeNumber;
    }
    //override Role function
    getRole()
    {
        return "Manager";
    }
    //return office number function
    getOfficeNumber()
    {
        return this.officeNumber;
    }
}

//export the Class
export default Manager;