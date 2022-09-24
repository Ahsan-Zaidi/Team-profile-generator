//required dependencies
const fs = require("fs");
const inquirer = require('inquirer');

//required Classes from libarary
const manager = require('./lib/Manager');
const intern = require('./lib/Intern');
const engineer = require('./lib/Engineer');
const Employee = require('./lib/Employee');

//prompt to Enter Manager Information w validation
const teamMembers = [];
const Role = [];
const mgrQuestions = [
    {
        type: "input",
        name: "id",
        message: "Enter Managers ID: ",
        validate: validID => {
            if (validID) {
                let id = parseInt(validID);
                if (Number.isInteger(id)) {
                    return true;
                } else {
                    console.log("Must be a digit 0-9 only!");
                    return false;
                }
            } else {
                console.log("ID is required!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "name",
        message: "Enter Managers Name: ",
        validate: validName => {
            if (validName) {
                let letters = /^[A-Za-z]+$/;
                if (validName.match(letters)) {
                    return true;
                } else {
                    console.log("Name should have alphabets only!");
                    return false;
                }
            } else {
                console.log("Employee Name is Required!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter Manager Email address: ",
        validate: validEmail => {
            if (validEmail) {
                let email = /\S+@\S+\.\S+/;
                if (validEmail) {
                    return true;
                } else {
                    console.log("Please Enter a Valid email address!");
                }
            } else {
                console.log('Email is required');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter Managers office number: ",
        validate: validOffNumber => {
            if(validOffNumber) {
                let num = parseInt(validOffNumber);
                if (Number.isInteger(num)) {
                    return true;
                } else {
                    console.log("Response must be a number value!")
                    return false;
                }
            } else {
                console.log("Office Number information is required!");
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'newEmployee',
        message: "Would you like to add another team member?",
        default: false
    }
]

//function to Add intern into Employee w validation
//push intern into new instance of employee
const askIntern = (employee) => {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Enter Intern's school name: ",
            validate: validIntern => {
                if (validIntern) {
                    let letters = /^[A-Za-z]+$/;
                    if (validIntern.match(letters)) {
                        return true;
                    } else {
                        console.log("School name should be letters only!");
                        return false;
                    }
                } else {
                    console.log("Intern's school name is required!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'newEmployee',
            message: 'Would you like to add more employees?',
            default: false
        }
    ]).then(response => {
        let emp = new intern(employee.id, employee.name, employee.email, response.school)
        teamMembers.push(emp);
        Role.push("Intern")
        if (response.newEmployee) {
            addnewEmp();
        } else {
            console.log("Team Complete!");
            console.log(teamMembers);
            createHtml(teamMembers);
        }
    });
}

