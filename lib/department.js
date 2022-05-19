/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// This file handles all the SQL queries/functions for the department table

const db = require('../db/connection');

const cTable = require('console.table');

// function to query all department data 

// ***** Most of the following comments apply to all the functions in this file ******
// This is an async function using await to handle the promise from the db.query
async function queryAllDepartmentData() {
    const sql = 'SELECT department.id AS ID, department.name AS Department FROM department';

    // the actual SQL query function - a promise returning values to rows and fields (arrays of objects)
    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err); });

    // if the rows object (an array of objects) contains a value (not false), print it to the console
    if (rows) {
        console.table(rows);  
        }

    // return true to the calling function to satify the requirement that a promise (async function) return a value
    return true;

}

// This function is used to provide an array of choices for the menu prompts.
// This is an async function using await to handle the promise from the db.query
async function queryAllDepartments() {
    const sql = 'SELECT department.name AS department FROM department';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

        if (rows) {
            // builds a new array of departments to return to the calling function
            let departmentArray = [];
            for (i=0; i < rows.length; i++){
                departmentArray.push(rows[i].department);
            }
    
            return departmentArray;
        }  

}

// This function is used with the menu prompts to translate a chosen department name into a department id which can be used by the final query.
// This is an async function using await to handle the promise from the db.query
async function returnDepartmentId(department) {
    const sql = `SELECT id FROM department WHERE name = ?`;
    const params = [department];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
}
// This function adds a department to the table
// This is an async function using await to handle the promise from the db.query
async function addDepartment(name){
    const sql = 'INSERT INTO department (name) VALUES(?)';
    const params = [name];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department added successfully");
        } 

    return true;

}

// This function deletes a department from the table 
async function deleteDepartment(id){
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Department deleted successfully");
        } 

    return true;

} 

// This function checks if a department is associated with an role --> does department_id in role = argument of department_id
// We do not want to try to delete an associated department as it will produce an error due to a constraint in the database definition
async function isDepartment(department_id) {

    const sql ='SELECT id FROM role WHERE department_id = ?';

    const params = [department_id];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    if (row.length === 0) {
        return false;
    } else {
        return true;
    }
        
}

// Exporting all the functions above
module.exports = {
                queryAllDepartmentData,
                addDepartment,
                deleteDepartment,
                queryAllDepartments,
                returnDepartmentId,
                isDepartment
                };
