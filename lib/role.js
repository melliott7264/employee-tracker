const db = require('../db/connection');
const cTable = require('console.table');

async function queryAllRoleData () {

    const sql = 'SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err); });

    if (rows) {
        console.table(rows);  
        }

return true;

};

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

async function returnRoleId(role) {
    const sql = `SELECT id FROM role WHERE title = "${role}"`;

    const [row, fields] = await db.query(sql).catch((err) => {
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