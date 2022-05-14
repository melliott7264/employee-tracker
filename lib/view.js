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

const inquirer = require('inquirer');

//********************* VIEW Menu Functions *********************

// This function called from the View Menu
async function displayEmployeesByManager() {
    const managersArray = await queryAllManagers();

    inquirer
    .prompt({
        type: "list",
        name: "manager",
        message: "Please select the Manager",
        choices: managersArray
    })
    .then(({manager}) => {
        returnManagerId(manager)
        .then((manager_id) => {
             // this query is in employee.js
            queryEmployeeByManager(manager_id)
            .then((istrue) => {
                if (istrue) {
                    return true;
                }    
            });
        });
    });
};

// This function called from the View Menu
async function displayEmployeesByDepartment() {
    const departmentArray = await queryAllDepartments();

    inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
    .then(({department}) => {
        returnDepartmentId(department)
        .then((department_id) => {
             // this query is in employee.js
            queryEmployeeByDepartment(department_id)
            .then((istrue)=>{
                if (istrue) {
                  return true; 
                }
            });
        });
    });

};

// This function called from the View Menu
async function displaySalariesByDepartment() {
    const departmentArray = await queryAllDepartments();

    inquirer
    .prompt({
        type: "list",
        name: "department",
        message: "Please select the Department",
        choices: departmentArray
    })
    .then(({department}) => {
        returnDepartmentId(department)
        .then((department_id) => {
            // this query is in employee.js
            queryEmployeeSalaryByDepartment(department_id)
            .then((istrue)=>{
                if (istrue) {
                   return true; 
                }
                
            });
        });
    });

};

module.exports = {
                    displayEmployeesByManager,
                    displayEmployeesByDepartment,
                    displaySalariesByDepartment
                };