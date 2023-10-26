DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;
CREATE TABLE department (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

CREATE TABLE role_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL(20,2),
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
        SET NULL
    );

CREATE TABLE employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role_table(id) ON DELETE
        SET NULL
    );