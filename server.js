const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'DNACode4$',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

function startApp() {
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


db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});


db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
