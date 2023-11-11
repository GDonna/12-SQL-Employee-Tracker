const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/index');
// const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


function startApp() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }])
    .then(answer => {
      console.log(answer);
      switch (answer.action) {
        case 'View all departments':
          viewDepartments()
          break;
        case 'View all roles':
          viewRoles()
          break;
        case 'View all employees':
          viewEmployees()
          break;
        case 'Add a department':
          addDepartment()
          break;
        case 'Add a role':
          addRole()
          break;
        case 'Add an employee':
          addEmployee()
          break;
        case 'Update an employee role':
          updateEmployeeRole()
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

function viewDepartments() {
  db.findDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    })
    .then(() => startApp());
}

function viewRoles() {
  db.findRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => startApp());
}

function viewEmployees() {
  db.findEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => startApp());
}

function addDepartment() {
  inquirer
    .prompt([{
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?'
    }])
    .then(answer => {
      db.createDepartment(answer.department)
        .then(() => console.log(`Added ${answer.department} to the database`))
        .then(() => startApp());
    });
}

function addRole() {
  db.findDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      inquirer
        .prompt([{
          type: 'input',
          name: 'title',
          message: 'What is the name of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: departmentChoices
        }])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => startApp());
        });
    });
}

function addEmployee() {
  db.findRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      inquirer
        .prompt([{
          type: 'input',
          name: 'first_name',
          message: 'What is the employee\'s first name?'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the employee\'s last name?'
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'What is the employee\'s role?',
          choices: roleChoices
        }])
        .then(employee => {
          db.createEmployee(employee)
            .then(() => console.log(`Added ${employee.first_name} ${employee.last_name} to the database`))
            .then(() => startApp());
        });
    });
}

function updateEmployeeRole() {
  db.findEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      inquirer
        .prompt([{
          type: 'list',
          name: 'employee_id',
          message: 'Which employee\'s role do you want to update?',
          choices: employeeChoices
        }])
        .then(employee => {
          db.findRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));
              inquirer
                .prompt([{
                  type: 'list',
                  name: 'role_id',
                  message: 'Which role do you want to assign the selected employee?',
                  choices: roleChoices
                }])
                .then(role => {
                  db.updateEmployeeRole(employee.employee_id, role.role_id)
                    .then(() => console.log('Updated employee\'s role'))
                    .then(() => startApp());
                });
            });
        });
    });
}
startApp();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
