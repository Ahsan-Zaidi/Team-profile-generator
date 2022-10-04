//create the Employee class
class Employee {
    //parameters passed in contructor object
    constructor (id, name, email)
    {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    //function to return Name
    getName()
    {
        return this.name;
    }
    //function to return Id
    getId()
    {
        return this.id;
    }
    //function to return email
    getEmail()
    {
        return this.email;
    }
    //function to return all roles in Employee class
    getRole()
    {
        return "Employee";
    }
}

//export the class
export default Employee;