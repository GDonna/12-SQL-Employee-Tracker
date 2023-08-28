DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE
    department (
        id INT NOT NULL,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    role_table (
        id INT NOT NULL,
        title VARCHAR(30),
        salary DECIMAL(20,2),
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
        SET NULL
    )

CREATE TABLE
    employee (
        id INT NOT NULL,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role_table(id) ON DELETE
        SET NULL
    )