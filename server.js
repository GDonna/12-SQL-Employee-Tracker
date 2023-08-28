const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: '',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

function startApp() {
  // Use inquirer to prompt user for options
  inquirer
    .prompt({
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
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          // Call function to view departments
          break;
        case 'View all roles':
          // Call function to view roles
          break;
        case 'View all employees':
          // Call function to view employees
          break;
        case 'Add a department':
          // Call function to add department
          break;
        case 'Add a role':
          // Call function to add role
          break;
        case 'Add an employee':
          // Call function to add employee
          break;
        case 'Update an employee role':
          // Call function to update employee role
          break;
        case 'Exit':
          // Exit the application
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

// Query database using COUNT() and GROUP BY
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});

// Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
