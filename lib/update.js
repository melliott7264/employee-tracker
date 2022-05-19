// This file handles all the update functions called from the menu functions in index.js

// These are all the SQL queries for the application as async functions

// These are all the employee table related queries
const {
    updateEmployeeRole,
    updateEmployeeManager,
    queryAllManagers,
    returnManagerId
   } = require('./employee');

// These are all the role table related queries       
const {
    queryAllRoles,
    returnRoleId
 } = require('./role');
// End SQL queries     

const inquirer = require('inquirer');

// ******************* UPDATE Menu Functions *******************

async function caseUpdateRole(employee_name, employee_id) {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const roleArray = await queryAllRoles();

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt ({
            type: "list",
            name: "role",
            message: `Please select the new role for ${employee_name}:`,
            choices: roleArray
            })
    // returns array of objects/responses from .prompt        
    .then(({role}) => {
        return returnRoleId(role)})
    .then((role_id) => {
        // returns return value of called function to inquirer hasRun
        return updateEmployeeRole(employee_id, role_id)           
    });
    // returns value of last .then function to calling fucntion in index.js
    return hasRun;
}

async function caseUpdateManager(employee_name, employee_id) {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const managersArray = await queryAllManagers();

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt ({
            type: "list",
            name: "manager",
            message: `Please select the new manager for ${employee_name}:`,
            choices: managersArray
            })
    // returns array of objects/responses from .prompt  
    .then(({manager}) => {
        return returnManagerId(manager)})
    .then((manager_id) => {
        // returns return value of called function to inquirer hasRun
        return updateEmployeeManager(employee_id, manager_id)
    });
    
    // returns value of last .then function to calling fucntion in index.js
    return hasRun;
}

module.exports = {
                    caseUpdateManager,
                    caseUpdateRole
                };