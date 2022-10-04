//required dependencies
import fs from 'fs';
import inquirer from 'inquirer';

//required Classes from libarary
import manager from './lib/Manager.js';
import intern from './lib/Intern.js';
import engineer from './lib/Engineer.js';
import Employee from './lib/Employee.js';

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

//function to ask for new Engineers as well as push them into emp
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

//HTML CARD PROPERTIES INTO FUNCTIONS TO RENDER HTML FILES
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
    let e = new intern(team.id, team.name, team.email, team.school)

    return addEmployeecard(e)+`
            School: ${e.getSchool()}
            </div>
            </div>
        </div>
    </div>`
}

const renderHtml=(teamMembers)=>
{
    let starthtml=`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>My Team Roster</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
    </head>
    
    <body>
      <header class="jumbotron text-center my-team-header bg-info text-white">
        <h1>My Team Roster</h1>
      </header>
      <main class="container ">
        <div class="row justify-content-center">
         `
    let endHtml=` </main>
    </body>
   </html>`
    for(let i=0;i<teamMembers.length;i++)
    {
        
     if(Role[i]==="Intern")
        {

            starthtml+=addInternCard(teamMembers[i]);
        }
        else if(Role[i]==="Engineer")
        {        
            let e=new engineer("a","b","c","d")
            starthtml+=addEngineerCard(teamMembers[i],e.getRole());
        }
        else 
        {
            let e=new manager("a","b","c","d")

            starthtml+=addManagerCard(teamMembers[i],e.getRole());
        }
    }
    return  starthtml+endHtml;
}

const createHtml = (teamMembers) => {
    fs.writeFile("./dist/team.html", renderHtml(teamMembers), err => {
        if (err) {
            console.log(err);
        };
    });
    console.log("END");
}
const init = () => {
    askManager();
}

init();