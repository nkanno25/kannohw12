const db = require('./config/connection');
const table = require('console.table');

const department_name = 'Accounting';
const sql = `SELECT id FROM department WHERE name='${department_name}';`

const getDeptId = () => {
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        return data;
    });
}
const department_id = getDeptId();

const getRoles = () => {
    const roles = `SELECT title FROM role;`;

    db.query(roles, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            roleArr.push(rows[i].title);
        }
    })
    return roleArr;
};
