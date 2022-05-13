const db = require('../db/connection');
const cTable = require('console.table');

// This file contains all the queries/functions for the department table.   The function names are pretty self-explanatory.

// function to query all department data 
async function queryAllDepartmentData() {
    const sql = 'SELECT department.id AS ID, department.name AS Department FROM department';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

};

// This function is used to provide an array of choices for the menu prompts.
async function queryAllDepartments() {
    const sql = 'SELECT department.name AS department FROM department';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

        if (rows) {
            let departmentArray = [];
            for (i=0; i < rows.length; i++){
                departmentArray.push(rows[i].department);
            }
    
            return departmentArray;
        }  

};

// This function is used with the menu prompts to translate a chosen department name into a department id which can be used by the final query.
async function returnDepartmentId(department) {
    const sql = `SELECT id FROM department WHERE name = ?`;
    const params = [department];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
};

async function addDepartment(name){
    const sql = 'INSERT INTO department (name) VALUES(?)';
    const params = [name];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department added successfully");
        } 

    return true;

};

async function deleteDepartment(id){
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department deleted successfully");
        } 

    return true;

}; 


module.exports = {
                queryAllDepartmentData,
                addDepartment,
                deleteDepartment,
                queryAllDepartments,
                returnDepartmentId
                };
