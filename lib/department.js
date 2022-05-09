const db = require('../db/connection');
const cTable = require('console.table');

// function to query all department data 
function queryAllDepartmentData() {
    const sql = 'SELECT department.id AS ID, department.name AS Department FROM department';
    
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    });
    };


module.exports = {queryAllDepartmentData};
