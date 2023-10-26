const express = require('express');
const inquirer = require('inquirer');
const db = require('./db');
const PORT = process.env.PORT || 3001;
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
          break;
        case 'View all employees':
          break;
        case 'Add a department':
          break;
        case 'Add a role':
          break;
        case 'Add an employee':
          break;
        case 'Update an employee role':
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
startApp();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
