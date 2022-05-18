/* eslint-disable no-undef */
// These are all the SQL queries for the application as async functions
// These are all the employee table related queries
const {
    queryEmployeeByManager,
    queryEmployeeByDepartment,
    queryEmployeeSalaryByDepartment,
    queryAllManagers,
    returnManagerId
   } = require('./employee');
// These are all the department table related queries       
const {
    queryAllDepartments,
    returnDepartmentId
   } = require('./department');
     
// End SQL queries     

const inquirer = require('inquirer');

//********************* VIEW Menu Functions *********************

// This function called from the View Menu
async function displayEmployeesByManager() {
    const managersArray = await queryAllManagers();

    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "manager",
        message: "Please select the Manager",
        choices: managersArray
    })
    .then(({manager}) => {
        return returnManagerId(manager)})
    .then((manager_id) => {
        // this query is in employee.js
        return queryEmployeeByManager(manager_id) });
   
    return hasRun;
}

// This function called from the View Menu
async function displayEmployeesByDepartment() {
    const departmentArray = await queryAllDepartments();

    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
    .then(({department}) => {
        return returnDepartmentId(department)})
    .then((department_id) => {
            // this query is in employee.js
        return queryEmployeeByDepartment(department_id)});
    
    return hasRun;
}

// This function called from the View Menu
async function displaySalariesByDepartment() {
    const departmentArray = await queryAllDepartments();

    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
    .then(({department}) => {
        return returnDepartmentId(department)})
    .then((department_id) => {
        // this query is in employee.js
        return queryEmployeeSalaryByDepartment(department_id)});
 
    return hasRun;
}

module.exports = {
                    displayEmployeesByManager,
                    displayEmployeesByDepartment,
                    displaySalariesByDepartment
                };