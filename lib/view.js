// This file handles all the display/view functions called by the menu functions in index.js

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
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const managersArray = await queryAllManagers();

     // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "manager",
        message: "Please select the Manager",
        choices: managersArray
    })
    // returns array of objects/responses from .prompt  to .then  
    .then(({manager}) => {
        return returnManagerId(manager)})
    .then((manager_id) => {
        // this query is in employee.js
        // returns return value of called function to inquirer hasRun
        return queryEmployeeByManager(manager_id) });
   
    // returns value of last .then function to calling fucntion in index.js
    return hasRun;
}

// This function called from the View Menu
async function displayEmployeesByDepartment() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const departmentArray = await queryAllDepartments();

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
    // returns array of objects/responses from .prompt  to .then  
    .then(({department}) => {
        return returnDepartmentId(department)})
    .then((department_id) => {
        // this query is in employee.js
        // returns return value of called function to inquirer hasRun
        return queryEmployeeByDepartment(department_id)});

    // returns value of last .then function to calling fucntion in index.js
    return hasRun;
}

// This function called from the View Menu
async function displaySalariesByDepartment() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const departmentArray = await queryAllDepartments();

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
     // returns array of objects/responses from .prompt to .then  
    .then(({department}) => {
        return returnDepartmentId(department)})
    .then((department_id) => {
        // this query is in employee.js
        // returns return value of called function to inquirer hasRun
        return queryEmployeeSalaryByDepartment(department_id)});
 
    // returns value of last .then function to calling fucntion in index.js    
    return hasRun;
}

// exports functions in this file
module.exports = {
                    displayEmployeesByManager,
                    displayEmployeesByDepartment,
                    displaySalariesByDepartment
                };