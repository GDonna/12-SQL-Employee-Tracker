const db = require('./connection');

class DB {
constructor(db) {this.connection = db;}

findDepartments() {
    return this.connection.promise().query(
        `SELECT * FROM department`
    ) 
    .catch(err => console.log('Error in finding Departments', err));
}
findRoles() {
    return this.connection.promise().query(
        `SELECT * FROM role_table`
    );
};
findEmployees() {
    return this.connection.promise().query(
        `SELECT employee.first_name, employee.last_name, role_table.title, role_table.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role_table ON employee.role_id = role_table.id LEFT JOIN department ON role_table.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`
    );
}
createDepartment(department) {
    return this.connection.promise().query(
        `INSERT INTO department SET ?`, department
    )
    .catch(err => console.log('Error in creating Department', err));
}
createRole(role) {
    return this.connection.promise().query(
        `INSERT INTO role_table SET ?`, role
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
