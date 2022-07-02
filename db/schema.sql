DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER, FOREIGN KEY (department_id) REFERENCES department(id)
);
 
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER
);