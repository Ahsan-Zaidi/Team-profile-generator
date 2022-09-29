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

//function to render html file after taking in Manager information
const askManager = () => {
    inquirer.prompt(mgrQuestions).then(employee => {
        let emp = new Manager(employee.id, employee.name, employee.email, employee.officeNumber);
        teamMembers.push(emp);
        Role.push("Manager");
        if (employee.newEmployee) {
            addnewEmp();
        } else {
            createHtml(teamMembers);
        }
    })
}

//
const askEngineer = (employee) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'Github',
            message: 'Enter Employees Github Username',
            validate: validGit => {
                if (validGit) {
                    return true;
                } else {
                    console.log('Github username is required!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'newEmployee',
            message: 'Would you like to add any more employees?',
            default: false
        }
    ]).then(response => {
        let emp = new engineer(employee.id, employee.name, employee.email, response.github)
        teamMembers.push(emp);
        Role.push("Engineer")

        if (response.newEmployee) {
            addnewEmp();
        } else {
            console.log("Team Complete!");
            console.log(teamMembers);
            createHtml(teamMembers);
        }
    });
}

//function to add a new employee to db
const addnewEmp = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'role',
            message: "Select Employees role: ",
            choices: ['Engineer', 'Intern', 'None']
        }
    ).then(employee => {
        if (employee.role == "None") {
            createHtml(teamMembers);
        } else {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Enter Employees Id: ',
                    validate: validID => {
                        if (validID) {
                            let id = parseInt(validID);
                            if (Number.isInteger(id)) {
                                return true;
                            } else {
                                console.log('Enter a digit 0-9 ONLY!');
                                return false;
                            }
                        } else {
                            console.log('Sorry Id is required');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter Employees Name: ',
                    validate: validName => {
                        if (validName) {
                            let letters = /^[A-Za-z]+$/;
                            if (validName.match(letters)) {
                                return true;
                            } else {
                                console.log('Name property should be letters only!');
                                return false;
                            }
                        } else {
                            console.log("Employees Name is Required!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Enter Employees email address: ',
                    validate: validEmail => {
                        if (validEmail) {
                            let email = /\S+@\S+\.\S+/;
                            if (validEmail.match(email)) {
                                return true;
                            } else {
                                console.log("Invalid Email Address");
                            }
                        } else {
                            console.log("Email is required");
                            return false;
                        }
                    }
                },
            ]).then(function(emp) {
                if (employee.role === "Engineer") {
                    askEngineer(emp);
                } else if (employee.role === "Intern") {
                    askIntern(emp);
                }
            });
        }
    })
}

const addManagerCard = (team) => {
    let e = new manager(team.id, team.name, team.email, team.officeNumber)
    return addEmployeecard(e)+`
                Office Number: ${e.getOfficeNumber()}
            </div>
        </div>
    </div>
</div> `
}

const addEngineerCard = (team) => {
    let e = new engineer(team.id, team.name, team.email, team.github)
    return addEmployeecard(e)+`
                <div class="employee-entry border border-secondary bg-white">
                    Github: <a href="https://github.com/${e.getGithub()}" target="_blank"?>${e.getGithub()}</a>
                </div>
            </div>
        </div>
    </div>`
}

const addEmployeecard = (e) => {
    return ` <div class="col-lg-4 mb-4">
    <div class="card employee-card">
        <div class="card-header employee-header bg-info text-white">
            <h4>${e.getName()}</h4>
            <h5><i class="fas fa-user-graduate "></i> ${e.getRole()}</h5>
        </div>
        <div class="card-body bg-light">
            <div class="employee-entry border border-secondary bg-white" >
                ID: ${e.getId()}
            </div>
            <div class="employee-entry border-right border-left border-secondary bg-white">
                Email: <a href="mailto:${e.getEmail()}">${e.getEmail()}</a>
            </div>
            <div class="employee-entry border border-secondary bg-white">`
}

const addInternCard = (team) => {
    
}