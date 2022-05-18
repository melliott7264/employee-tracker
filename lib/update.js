/* eslint-disable no-undef */
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
    const roleArray = await queryAllRoles();

    let hasRun = inquirer
    .prompt ({
            type: "list",
            name: "role",
            message: `Please select the new role for ${employee_name}:`,
            choices: roleArray
            })
    .then(({role}) => {
        return returnRoleId(role)})
    .then((role_id) => {
        return updateEmployeeRole(employee_id, role_id)           
    });
   
    return hasRun;
}

async function caseUpdateManager(employee_name, employee_id) {
    const managersArray = await queryAllManagers();

    let hasRun = inquirer
    .prompt ({
            type: "list",
            name: "manager",
            message: `Please select the new manager for ${employee_name}:`,
            choices: managersArray
            })
    .then(({manager}) => {
        return returnManagerId(manager)})
    .then((manager_id) => {
        return updateEmployeeManager(employee_id, manager_id)
    });
    
    return hasRun;
}

module.exports = {
                    caseUpdateManager,
                    caseUpdateRole
                };