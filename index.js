
const inquirer = require('inquirer');
const db = require('./config/connection');
const table = require('console.table');

var roleArr = [];
var deptArr = [];

var empArr = [];
var nameArray = [];
var managerArr = [];

const getRoles = () => {

    const roles = `SELECT * FROM role;`;
    db.query(roles, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            // roleArr.push(rows[i].title);
            var rolesData = {
                name: rows[i].title,
                value: rows[i].id,
            }
            roleArr.push(rolesData)
        };

    return roleArr;
        });
};
getRoles();
const getDepts = () => {
    const depts = `SELECT * FROM department;`;
    db.query(depts, (err, rows) => {
        if (err) {
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            var dept = {
                name: rows[i].name,
                value: rows[i].id,
            }
            deptArr.push(dept);
        }
    })
    return deptArr;
};
getDepts();

const getEmps = () => {
    const sql = 'SELECT first_name, last_name FROM employee;';
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            let empName = rows[i].first_name + " " + rows[i].last_name;
            empArr.push(empName);
        }
    })
    return empArr;
};

const selectManager = () => {
    const sql = `SELECT * FROM employee WHERE manager_id IS null`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    });
};
 selectManager();
const promptMenu = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What would you like to do?',
                choices: [
                    'View Departments',
                    'View Positions',
                    'View Employees',
                    'Add Department',
                    'Add Position',
                    'Add Employee',
                    'Update Employee Role'
                ]
            }
        ])
        .then(menuChoice => {
            switch (menuChoice.menu) {
                case 'View Departments':
                    viewDepts();
                    break;
                case 'View Positions':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmps();
                    break;
                case 'Add Department':
                    addDept();
                    break;
                case 'Add Position':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Update Employee Role':
                    updateEmpRole();
                    break;
            }
        })
};

const viewDepts = () => {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        promptMenu()
    });

};

const viewRoles = () => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        promptMenu()
    });
};

const viewEmps = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        promptMenu()
    });
};

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What is the name of the new department?'
        }
    ]).then(deptTitle => {
        deptArr.push(deptTitle.name);

        const newName = deptTitle.dept;
        const sql = `INSERT INTO department (name) VALUES ('${newName}');`;
        const sql2 = `SELECT * FROM department;`;

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        db.query(sql2, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            promptMenu()

        });
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the title of the new role?', // change question names
            validate: nameInput => {
                if (!nameInput) {
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary as a number. (Do not include currency symbols.)',
            validate: function (nameInput) {
                if (isNaN(nameInput) || !nameInput) {
                    return false;
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'department_name',
            message: 'Select the department this role will belong to.',
            choices: deptArr
        }
    ]).then(roleInfo => {
        const { role, salary, department_name } = roleInfo;
        const sql = `SELECT id FROM department WHERE name='${department_name}';`
        console.log(roleInfo);

        const department_id = roleInfo.department_name;
        console.log(department_id);
        
        const sql2 = `INSERT INTO role (title, salary, department_id) VALUES ('${role}', ${salary}, ${department_id});`;
        db.query(sql2, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });        
        
        const sql3 = `SELECT * FROM role;`;
        db.query(sql3, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            promptMenu()

        });
    })
};

const addEmp = () => {

   //  roleArr = getRoles(); 
    empArr = getEmps();
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the FIRST name of the employee.',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the LAST name of the employee.',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select their role in the company.',
            choices: roleArr,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager they will work under. If none, ????.',
            choices: managerArr
        }
    ]).then(empInfo => {
        const { first_name, last_name, role, manager } = empInfo;
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role}', ${manager});`;
        const sql2 = `SELECT * FROM role;`;

        var empName = empInfo.first_name + " " + empInfo.last_name;
        empArr.push(empName);

        db.query(sql, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        db.query(sql2, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            promptMenu()

        });
    })
};

const updateEmpRole = () => {
    empArr = getEmps();

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee to update.',
            choices: []
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Select their new role.',
            choices: []
        }
    ]).then()

};

init = () => {
    promptMenu();
}

init();