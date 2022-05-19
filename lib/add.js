// ******* This file handles all the add functions called by the menu functions in index.js *********

// These are all the SQL queries for the application as async functions

// These are all the employee table related queries

const {
    addAnEmployee,
    queryAllManagers,
    returnManagerId
   } = require('./employee');

// These are all the department table related queries       
const {
    addDepartment,
    queryAllDepartments,
    returnDepartmentId
   } = require('./department');

// These are all the role table related queries       
const {
    addRole,
    queryAllRoles,
    returnRoleId
 } = require('./role');
// End SQL queries    

const inquirer = require('inquirer');

// ************** ADD Menu Functions ***************

// Function called from Add menu
async function caseAddDepartment() {

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt (
        {
            type: "input",
            name:   "department",
            message: "Please enter the department name:",
            validation: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for your Department!');
                    return false;
                }
            }
        }
    )
    // array of .prompt responses returned to .then statement
    .then((inputDataArray) => {
        // returns value to hasRun
        return addDepartment(inputDataArray.department)});             
      
    return hasRun;
}

// This function called from Add menu
async function caseAddRole() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked  
    const departmentArray = await queryAllDepartments();

    // Global variables defined for use in the .then functions
    let title = "";
    let salary = null;

    // inquirer assined to a variable so as to use non-nested .then statements below - need to be able to return a value to the calling function
    let hasRun = inquirer
    .prompt ([
        {
            type: "input",
            name:   "title",
            message: "Please enter the role title:",
            validation: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter a title for the role!');
                    return false;
                }
            }
        },
        {
            type: "number",
            name:   "salary",
            message: "Please enter the role salary:",
            validation: salaryInput => {
                if (Number.isInteger(salaryInput)) {
                    return true;
                } else {
                    console.log('Please enter an integer for the salary for the role!');
                    return false;
                }
            }
        },
        {
            type: "list",
            name:   "department_name",
            message: "Please choose a department:",
            choices: departmentArray
        }
    ])
    // returns values to next .then statement
    .then((inputDataArray) => {
        title = inputDataArray.title;
        salary = inputDataArray.salary;
        return returnDepartmentId(inputDataArray.department_name)})
    .then((department_id) => {
        // As the last .then statement, returns value to hasRun
        return addRole(title, salary, department_id)}); 

    // returns value of return from last .then statement    
    return hasRun;
}

async function caseAddEmployee() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked  
    const roleArray = await queryAllRoles();
    const managersArray = await queryAllManagers();
    
    // Global variables defined for use in the .then functions
    let first_name = "";
    let last_name = "";
    let manager = "";
    let role_id = null;

    let hasRun = inquirer
    .prompt ([
        {
            type: "input",
            name:   "first_name",
            message: "Please enter the employees first name:",
            validation: first_nameInput => {
                if (first_nameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name for the employee!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name:   "last_name",
            message: "Please enter the employees last name:",
            validation: last_nameInput => {
                if (last_nameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name for the employee!');
                    return false;
                }
            }
        },
        {
            type: "list",
            name:   "role",
            message: "Please select the role for this employee:",
            choices:  roleArray
        },
        {
            type: "list",
            name:   "manager",
            message: "Please select the manager for this employee:",
            choices: managersArray
        }
    ])
    // returns values to next .then statement
    .then((inputDataArray) => {
        first_name = inputDataArray.first_name;
        last_name = inputDataArray.last_name;
        manager = inputDataArray.manager;
        return returnRoleId(inputDataArray.role)})
    .then((returned_role_id) => {
        role_id = returned_role_id;
        return returnManagerId(manager)})
    .then((manager_id) => {
           // As the last .then statement, returns value to hasRun
        return addAnEmployee(first_name, last_name, role_id, manager_id)
    });

    // returns value of return from last .then statement
    return hasRun;
}

module.exports = {
                    caseAddDepartment,
                    caseAddEmployee,
                    caseAddRole
                };