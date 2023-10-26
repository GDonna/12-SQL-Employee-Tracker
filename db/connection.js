const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'DNACode4$',
      database: 'employee_db'
    },
    console.log(`Connected to the books_db database.`)
  );
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = db;