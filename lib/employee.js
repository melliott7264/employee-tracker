/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// This file contains all the queries/functions related to the employee table.  All function names are pretty much self-explanatory.

const db = require('../db/connection');

// eslint-disable-next-line no-unused-vars
const cTable = require('console.table');



//function to query all employee data with referenced data from role and department
// ***** Most of the following comments apply to all the functions in this file ******
// This is an async function using await to handle the promise from the db.query
async function queryAllEmployeeData() {
  
    // This query references a foreign key (manager_id) that points to a primary key in the same table.
    // Had to use two aliases (t1 and t2) and do a LEFT JOIN for the same table to get the manager (foreign key).
    const sql = `SELECT 
                 t1.id AS ID,
                 CONCAT(t1.first_name, " ", t1.last_name) AS Employee,
                 role.title AS Title,
                 department.name AS Department,
                 role.salary AS Salary,
                 CONCAT(t2.first_name, " ", t2.last_name) AS Manager 
                 FROM employee AS t1 
                 LEFT JOIN employee AS t2 ON t1.manager_id = t2.id 
                 LEFT JOIN role ON t1.role_id = role.id 
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

// This function is used to provide an array of choices to the menu lists.
async function queryAllEmployees() {

    const sql = 'SELECT CONCAT(first_name, " ", last_name) AS employee FROM employee';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

    if (rows) {
        // this builds a new array of employees to return to the calling function for use in list of menu choices
        let employeeArray = [];
        for (let i=0; i < rows.length; i++){
            employeeArray.push(rows[i].employee);
        }
        // returns the array of employee names to the calling function
        return employeeArray;
    }  
}

// This function is used with the function above in the menu lists to translate a menu choice into an id that can be use by the final query.
async function returnEmployeeId(employee_name) {
   
    const sql = `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?`;
   
    const params = [employee_name]

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        // row is an array of objects - returning the first id
        return row[0].id;

}

// This function lists the employees for a given manager
async function queryEmployeeByManager(manager_id) {

    // This query references a foreign key (manager_id) that points to a primary key in the same table.
    // Had to use two aliases (t1 and t2) and do a LEFT JOIN for the same table to get the manager (foreign key).
    const sql = `SELECT t1.id AS ID, 
                CONCAT(t1.first_name, " ", t1.last_name) AS Employee, 
                role.title AS Title, department.name AS Department, 
                role.salary AS Salary, 
                CONCAT(t2.first_name, " ", t2.last_name) AS Manager 
                FROM employee AS t1 
                LEFT JOIN employee AS t2 ON t1.manager_id = t2.id 
                LEFT JOIN role ON t1.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id 
                WHERE t1.manager_id = ?`;

    const params = [manager_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    // return true to the calling function to satify the requirement that a promise (async function) return a value
    return true;

}

// This function lists the employees in a given department
async function queryEmployeeByDepartment(department_id) {

    // This query references a foreign key (manager_id) that points to a primary key in the same table.
    // Had to use two aliases (t1 and t2) and do a LEFT JOIN for the same table to get the manager (foreign key).
    const sql = `SELECT t1.id AS ID, 
                CONCAT(t1.first_name, " ", t1.last_name) AS Employee, 
                role.title AS Title, 
                department.name AS Department, 
                role.salary AS Salary, 
                CONCAT(t2.first_name, " ", t2.last_name) AS Manager 
                FROM employee AS t1 
                LEFT JOIN employee AS t2 ON t1.manager_id = t2.id 
                LEFT JOIN role ON t1.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id 
                WHERE department.id = ?`;

    const params = [department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

}

// This function sums the salaries of all the employees in a given department
async function queryEmployeeSalaryByDepartment(department_id) {

    const sql = `SELECT department.name AS Department, 
                SUM (role.salary) AS Department_Salaries 
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id 
                WHERE department.id = ?`;

    const params = [department_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
            console.error(err); });

    if (rows) {
        console.table(rows);  
        }

    return true;

}

// This function adds a employee to the table
async function addAnEmployee(first_name, last_name, role_id, manager_id){

    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)';

    const params = [first_name, last_name, role_id, manager_id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Employee added successfully");
        } 

    return true;

} 

// This function deletes an employee from the table
async function deleteAnEmployee(id){

    const sql = 'DELETE FROM employee WHERE id = ?';

    const params = [id];

    const [rows, fields] = await db.query(sql, params).catch((err) => { 
        console.error(err);  });

        if (rows.affectedRows) {
            console.log("Employee deleted successfully");
        } 

    return true;

} 

// This function updates an employees role
async function updateEmployeeRole(id, role) {

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

    const params = [role, id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    if (rows.affectedRows) {
        console.log("Employee updated successfully");
    }    

    return true;
}

// This function updates an employees manager
async function updateEmployeeManager(id, manager_id) {

    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

    const params = [manager_id, id];

    const [rows, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    if (rows.affectedRows) {
        console.log("Employee updated successfully");
    }    

    return true;
}

// This function is used with the menu lists to provide an array of choices for the list.
async function queryAllManagers() {

    const sql = 'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE manager_id IS NULL';

    const [rows, fields] = await db.query(sql).catch((err) => {
        console.error(err);  });

    if (rows) {
        let managersArray = [];
        for (let i=0; i < rows.length; i++){
            managersArray.push(rows[i].manager);
        }

        return managersArray;
    }    
}

// This function is used with the function above to translate an manager choice into an id that can be used by the final query.
async function returnManagerId(manager) {
  
    const sql = `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?`;
  
    const params = [manager];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err);  });

        return row[0].id;
 
}

// This function checks if an employee is an active manager (if their id is in manager_id)
async function isManager(employee_id) {

    const sql ='SELECT id FROM employee WHERE manager_id = ?';

    const params = [employee_id];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    // took a lot of trial and error to determine that the array length is the best way to determine if a value was returned for the above query
    if (row.length === 0) {
        return false;
    } else {
        return true;
    }
        
}

// This function checks if an role is assigned to an employee  (if role_id = the argument role_id)
async function isRole(role_id) {

    const sql ='SELECT id FROM employee WHERE role_id = ?';

    const params = [role_id];

    const [row, fields] = await db.query(sql, params).catch((err) => {
        console.error(err); });

    // if array (row) length is zero, then a value was not returned from the above query
    if (row.length === 0) {
        return false;
    } else {
        return true;
    }
        
}

// Exports all the functions above
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
                returnManagerId,
                queryAllEmployees,
                returnEmployeeId,
                isManager,
                isRole
                };
