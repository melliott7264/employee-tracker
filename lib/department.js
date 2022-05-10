const db = require('../db/connection');
const cTable = require('console.table');

// function to query all department data 
async function queryAllDepartmentData() {
    const sql = 'SELECT department.id AS ID, department.name AS Department FROM department';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return;

};

async function addDepartment(name){
    const sql = 'INSERT INTO department (name) VALUES(?)';
    const params = [name];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department added successfully");
        } 

    return;

};

async function deleteDepartment(id){
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department deleted successfully");
        } 

    return;

}; 


module.exports = {
                queryAllDepartmentData,
                addDepartment,
                deleteDepartment
                };
