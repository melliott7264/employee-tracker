const db = require('../db/connection');
const cTable = require('console.table');

//function to query all employee data with referenced data from role and department
function queryAllEmployeeData() {
const sql = 'SELECT t1.id AS ID, CONCAT(t1.first_name, " ", t1.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(t2.first_name, " ", t2.last_name) AS Manager FROM employee AS t1 LEFT JOIN employee AS t2 on t1.manager_id = t2.id LEFT JOIN role ON t1.role_id = role.id LEFT JOIN department ON role.department_id = department.id';

db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.table(rows);
    }
});
};


module.exports = {queryAllEmployeeData};
