const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
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
                name: "officeNumber",
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
                name: "officeNumber",
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
}

function renderHtml() {
  switch (employee) {
    case "Manager":
      fs.writeFileSync(
        "./index.html",
        /*html*/ `
    ${employees.map(
      (employee) => /* html*/ `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
     <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Title: ${employee.getRole()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.getId()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Email: ${employee.getEmail()}</h6>
  </div>
  `
    )}
</div> 
`
      );
    case "Engineer":
      fs.writeFileSync(
        "./index.html",
        /*html*/ `
    ${employees.map(
      (employee) => /* html*/ `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
     <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Title: ${employee.getRole()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.getId()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Email: ${employee.getEmail()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Git Hub: ${employee.getGithub()}</h6>
  </div>
  `
    )}
</div> 
`
      );
    case "Intern":
      fs.writeFileSync(
        "./index.html",
        /*html*/ `
    ${employees.map(
      (employee) => /* html*/ `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
     <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Title: ${employee.getRole()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.getId()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Email: ${employee.getEmail()}</h6>
      <h6 class="card-subtitle mb-2 text-muted">School: ${employee.getSchool()}</h6>
  </div>
  `
    )}
</div> 
`
      );
  }
}
newEmployee();
