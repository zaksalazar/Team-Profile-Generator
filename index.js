const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const fs = require("fs");
const employees = [];

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the name of this employee?`,
        name: "name",
      },
      {
        type: "list",
        message: "What position is this employee?",
        name: "position",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: `What is the employee's email?`,
        name: "email",
      },
      {
        type: "input",
        message: `What is the employee's ID number?`,
        name: "id",
      },
    ])
    .then(({ position, email, id, name }) => {
      switch (position) {
        case "Manager":
          inquirer
            .prompt([
              {
                tpye: "Input",
                message: `What is the Manager's office number?`,
                name: "officeNumber",
              },
            ])
            .then(({ officeNumber }) => {
              employees.push(new Manager(name, id, email, officeNumber));
              another();
            });
          break;
        // ask for office number
        case "Engineer":
          //ask for git hub
          inquirer
            .prompt([
              {
                tpye: "Input",
                message: `What is the Engineer's Git Hub user name?`,
                name: "gitHub",
              },
            ])
            .then(({ gitHub }) => {
              employees.push(new Engineer(name, id, email, gitHub));
              another();
            });
          break;
        case "Intern":
          // ask about school
          inquirer
            .prompt([
              {
                tpye: "Input",
                message: `What school does the Intern attend?`,
                name: "school",
              },
            ])
            .then(({ school }) => {
              employees.push(new Intern(name, id, email, school));
              another();
            });
          break;
      }
    });
}
function another() {
  return inquirer
    .prompt([
      {
        type: "confirm",
        message: "Create another employee?",
        name: "more",
      },
    ])
    .then(({ more }) => {
      if (more) newEmployee();
      else renderHtml();
    });

  function renderHtml() {
    fs.writeFileSync(
      "./index.html",
      /*html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<div class="jumbotron" style="text-align: center; border-bottom: 5px solid black; opacity : .9; background : linear-gradient(to top, rgb(96, 179, 220), rgb(239, 243, 245)); color:black; text-align:center; " id="jumbotron">
  <h1 class="display-4" style="font-weight:bolder;">Team Roster</h1>
  </div>
  <div class="container">
  <div class="row">

${employees.map(
  (employee) => /*html*/ `

<div class= "col-md-3 text-dark bg-light border border-dark rounded-lg" style = "margin : 5px;">
  <h1 class="card-title">${employee.getName()}</h1>
  <h2 class="card-subtitle mb-2 text-dark">${employee.getRole()}</h2>
  <h3 class="card-subtitle mb-2 text-dark">Id: ${employee.getId()}</h3>
  <h4 class="card-subtitle mb-2 text-muted"><a href="mailto:${employee.getEmail()}" class="card-link">${employee.getEmail()}</a></h3>
  <h4 class="card-subtitle mb-2 text-muted"> ${uniqueField(employee)}</h3>
  
</div>

`
)} 
  </div>
        
        `
    );
  }
}

function uniqueField(employee) {
  switch (employee.getRole()) {
    case "Manager":
      return `Office:${employee.getOfficeNumber()}`;

    // ask for office number
    case "Engineer":
      //ask for git hub
      return `<a href="https://github.com/${employee.getGithub()}" class="card-link">Github</a>`;

    case "Intern":
      // ask about school
      return ` Student at: ${employee.getSchool()}`;
  }
}
newEmployee();
