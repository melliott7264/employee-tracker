const db = require('../db/connection');
const cTable = require('console.table');

//function to query all employee data with referenced data from role and department
async function queryAllEmployeeData() {
    const sql = 'SELECT t1.id AS ID, CONCAT(t1.first_name, " ", t1.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(t2.first_name, " ", t2.last_name) AS Manager FROM employee AS t1 LEFT JOIN employee AS t2 on t1.manager_id = t2.id LEFT JOIN role ON t1.role_id = role.id LEFT JOIN department ON role.department_id = department.id';

    const [rows, fields] = await db.query(sql).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

};

async function queryEmployeeByManager(manager_id) {
    const sql = 'SELECT t1.id AS ID, CONCAT(t1.first_name, " ", t1.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(t2.first_name, " ", t2.last_name) AS Manager FROM employee AS t1 LEFT JOIN employee AS t2 on t1.manager_id = t2.id LEFT JOIN role ON t1.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE t1.manager_id = ?';
    const params = [manager_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

};

async function queryEmployeeByDepartment(department_id) {
    const sql = 'SELECT t1.id AS ID, CONCAT(t1.first_name, " ", t1.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(t2.first_name, " ", t2.last_name) AS Manager FROM employee AS t1 LEFT JOIN employee AS t2 on t1.manager_id = t2.id LEFT JOIN role ON t1.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?';
    const params = [department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

};

async function queryEmployeeSalaryByDepartment(department_id) {
    const sql = 'SELECT department.name AS Department, SUM (role.salary) AS Department_Salaries FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?';
    const params = [department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

};

async function addAnEmployee(first_name, last_name, role_id, manager_id){
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)';
    const params = [first_name, last_name, role_id, manager_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Employee added successfully");
        } 

    return true;

}; 

async function deleteAnEmployee(id){
    const sql = 'DELETE FROM employee WHERE id = ?';
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Employee deleted successfully");
        } 

    return true;

}; 

async function updateEmployeeRole(id, role) {
    const sql = `UPDATE employee SET role_id = ${role} WHERE id = ?`;
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    if (rows.affectedRows) {
        console.log("Employee updated successfully");
    }    

    return true;
};

async function updateEmployeeManager(id, manager_id) {
    const sql = `UPDATE employee SET manager_id = ${manager_id} WHERE id = ?`;
    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    if (rows.affectedRows) {
        console.log("Employee updated successfully");
    }    

    return true;
};

async function queryAllManagers() {
    const sql = 'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE manager_id IS NULL';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

    if (rows) {
        let managersArray = [];
        for (i=0; i < rows.length; i++){
            managersArray.push(rows[i].manager);
        }

        return managersArray;
    }    
};

async function returnManagerId(manager) {
    const sql = `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${manager}"`;

    const [row, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
};



module.exports = {  
                queryAllEmployeeData,
                queryEmployeeByManager,
                queryEmployeeByDepartment,
                queryEmployeeSalaryByDepartment,
                addAnEmployee,
                deleteAnEmployee,
                updateEmployeeRole,
                updateEmployeeManager,
                queryAllManagers,
                returnManagerId
                };
