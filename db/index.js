const db = require('./connection');

class DB {
constructor(db) {this.connection = db;}

findDepartments() {
    return this.connection.promise().query(
        `SELECT * FROM department`
    );
}
findRoles() {
    return this.connection.promise().query(
        `SELECT * FROM role`
    );
};
findEmployees() {
    return this.connection.promise().query(
        `SELECT * FROM employee`
    );
}
createDepartment(department) {
    return this.connection.promise().query(
        `INSERT INTO department SET ?`, department
    );
}
createRole(role) {
    return this.connection.promise().query(
        `INSERT INTO role SET ?`, role
    );
}
createEmployee(employee) {
    return this.connection.promise().query(
        `INSERT INTO employee SET ?`, employee
    );
}
updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
        `UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId]
    );
}
}

module.exports = new DB(db);