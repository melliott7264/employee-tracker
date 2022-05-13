const db = require('../db/connection');
const cTable = require('console.table');

// this file contains all the database queries/functions for the roles table.  The function names are all self-explanatory.

async function queryAllRoleData () {

    const sql = `SELECT role.id AS ID, 
                role.title AS Title, 
                role.salary AS Salary, 
                department.name AS Department 
                FROM role 
                LEFT JOIN department ON role.department_id = department.id`;

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err); });

    if (rows) {
        console.table(rows);  
        }

return true;

};

// This function is used to provide an array of choices for menu prompts using inquirer.
async function queryAllRoles() {
    const sql = 'SELECT role.title AS role FROM role';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

        if (rows) {
            let roleArray = [];
            for (i=0; i < rows.length; i++){
                roleArray.push(rows[i].role);
            }
    
            return roleArray;
        }  

};

// This function is used with the menu prompts to translate a role name into a role id which can be used by the final query.
async function returnRoleId(role) {
    const sql = `SELECT id FROM role WHERE title = ?`;
    const params = [role];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
};

async function addRole(title, salary, department_id){
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES(?,?,?)';
    const params = [title, salary, department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Role added successfully");
        } 

    return true;

};

async function deleteRole(id){
    const sql = 'DELETE FROM role WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Role deleted successfully");
        } 

    return true;

}; 

module.exports = {
                queryAllRoleData,
                addRole,
                deleteRole,
                queryAllRoles,
                returnRoleId
                };