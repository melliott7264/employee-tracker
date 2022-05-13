// These are all the SQL queries for the application as async functions
// These are all the employee table related queries
const {
    queryAllEmployeeData,
    addAnEmployee,
    deleteAnEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    queryEmployeeByManager,
    queryEmployeeByDepartment,
    queryEmployeeSalaryByDepartment,
    queryAllManagers,
    returnManagerId,
    queryAllEmployees,
    returnEmployeeId
   } = require('./employee');
// These are all the department table related queries       
const {
    queryAllDepartmentData,
    addDepartment,
    deleteDepartment,
    queryAllDepartments,
    returnDepartmentId
   } = require('./department');
// These are all the role table related queries       
const {
    queryAllRoleData,
    addRole,
    deleteRole,
    queryAllRoles,
    returnRoleId
 } = require('./role');
// End SQL queries     

// Need to be able to call displayInitialMenu in index.js
const displayInitialMenu = require('../index');

const inquirer = require('inquirer');

// ******************* UPDATE Menu Functions *******************

async function caseUpdateRole() {
    const roleArray = await queryAllRoles();

    inquirer
    .prompt ({
            type: "list",
            name: "role",
            message: `Please select the new role for ${employee_name}:`,
            choices: roleArray
            })
    .then(({role}) => {
        returnRoleId(role)
        .then((role_id) => {
            updateEmployeeRole(employee_id, role_id)           
            .then((istrue) => {
                if (istrue) {
                displayInitialMenu();
                }
            });
        });
    });
};

async function caseUpdateManager() {
    const managersArray = await queryAllManagers();

    inquirer
    .prompt ({
            type: "list",
            name: "manager",
            message: `Please select the new manager for ${employee_name}:`,
            choices: managersArray
            })
    .then(({manager}) => {
        returnManagerId(manager)
        .then((manager_id) => {
            updateEmployeeManager(employee_id, manager_id)
            .then((istrue) => {
                if (istrue) {
                    displayInitialMenu();
                }
            });
        });
    });
};

module.exports = {
                    caseUpdateManager,
                    caseUpdateRole
                };