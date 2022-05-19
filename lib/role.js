/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// this file contains all the database queries/functions for the roles table.  The function names are all self-explanatory.

const db = require('../db/connection');

const cTable = require('console.table');

// This function queries and prints all the entries in the role table
// ***** Most of the following comments apply to all the functions in this file ******
// This is an async function using await to handle the promise from the db.query
async function queryAllRoleData () {

    const sql = `SELECT role.id AS ID, 
                role.title AS Title, 
                role.salary AS Salary, 
                department.name AS Department 
                FROM role 
                LEFT JOIN department ON role.department_id = department.id`;

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

// This function is used to provide an array of choices for menu prompts using inquirer.
async function queryAllRoles() {
    const sql = 'SELECT role.title AS role FROM role';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

        if (rows) {
            // this builds a new array of roles to return to the calling function for menu of choices
            let roleArray = [];
            for (i=0; i < rows.length; i++){
                roleArray.push(rows[i].role);
            }
    
            // returns the array of roles to the calling function
            return roleArray;
        }  

}

// This function is used with the menu prompts to translate a role name into a role id which can be used by the final query.
async function returnRoleId(role) {
    const sql = `SELECT id FROM role WHERE title = ?`;
    const params = [role];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
}

// This function adds a role to the table
async function addRole(title, salary, department_id){
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES(?,?,?)';
    const params = [title, salary, department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Role added successfully");
        } 

    return true;

}

// This function deletes a role from the table
async function deleteRole(id){
    const sql = 'DELETE FROM role WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Role deleted successfully");
        } 

    return true;

} 

// exports all the above functions
module.exports = {
                queryAllRoleData,
                addRole,
                deleteRole,
                queryAllRoles,
                returnRoleId
                };