const db = require('../db/connection');
const cTable = require('console.table');

function queryAllRoleData () {

const sql = 'SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id';

db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.table(rows);
    }
});
};


module.exports = {queryAllRoleData};