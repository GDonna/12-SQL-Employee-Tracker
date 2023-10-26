USE employee_db;
INSERT INTO role_table (title, salary, department_id)
VALUES ("Sales Account Manager", "100000", 1),
       ( "Vice President", "300000", 2),
       ("Account Operation Manager", "65000", 1),
       ("Customer Service", "55000", 1),
       ("Receptionist", "45000", 2);
       
INSERT INTO department (name)
VALUES ("Sales"),
       ("Administration");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jenny", "Smith", 4, NULL),
        ("Adam", "Tucker", 1, 1),
        ("Sally", "Jones", 2, NULL),
        ("John", "Doe", 3, 3),
        ("Jane", "Doe", 5, 4);