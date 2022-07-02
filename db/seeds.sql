INSERT INTO department (name)
VALUES ("Sales"), 
       ("Accounting"), 
       ("Management"), 
       ("Executive"); 

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 55000.00, 1), 
       ("Accountant", 75000.00, 4), 
       ("Manager", 85000.00, 3), 
       ("Front End Developer", 90000.00, 2), 
       ("Back End Developer", 95000.00, 2), 
       ("Full Stack Developer", 100000.00, 1); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Kanno", 1, 6),
       ("Blaine", "Kanno", 2, 3),
       ("Al", "Kanno", 3, null),
       ("Ann", "Kanno", 3, 6),
       ("Rosie", "Kanno", 5, null),
       ("Luka","Doncic", 1, null);
