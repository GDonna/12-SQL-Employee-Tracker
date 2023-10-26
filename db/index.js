const db = require('./connection');

class DB {
constructor(db) {this.connection = db;}

findDepartments() {
    return this.connection.promise().query(
        `SELECT * FROM department`
    );
}
};

module.exports = new DB(db);
