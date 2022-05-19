// ******** This file contains all the delete functions called by the menu functions in index.js ***********

// These are all the SQL queries for the application as async functions
// These are all the employee table related queries
const {
    deleteAnEmployee,
    queryAllEmployees,
    returnEmployeeId,
    isManager,
    isRole
   } = require('./employee');
// These are all the department table related queries       
const {
    deleteDepartment,
    queryAllDepartments,
    returnDepartmentId,
    isDepartment
   } = require('./department');
// These are all the role table related queries       
const {
    deleteRole,
    queryAllRoles,
    returnRoleId
 } = require('./role');
// End SQL queries  

const inquirer = require('inquirer');

// **************** DELETE Menu Functions ****************

async function caseDeleteEmployee() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const employeeArray = await queryAllEmployees();
    // Global variables defined for use in the .then functions
    let employee_id = null;

    let hasRun = inquirer
    .prompt({
            type: "list",
            name: "employee_name",
            message: "Select the Employee to delete:",
            choices: employeeArray
    })
    // employee_name returned from .prompt
    .then(({employee_name}) => {
        return returnEmployeeId(employee_name)})
    // employee_id returned as returned_employee_id to avoid a conflict in assigning it to a global variable
    .then((returned_employee_id) => {
        employee_id = returned_employee_id;
        // does employee_id = any manager_id
        return isManager(employee_id)}) 
    .then((is_manager) => {
        // Checking if the employee_id is referenced as a manager in manager_id in the employee table 
        if (is_manager) {
            console.log("You cannot delete an employee who is a current manager.");
            return true;
        } else {
            // deleteAnEmployee(id) if it is not a manager
            return deleteAnEmployee(employee_id)   
        }
    });
 
    return hasRun;    
}

async function caseDeleteDepartment() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const departmentArray = await queryAllDepartments();
    // Global variables defined for use in the .then functions
    let department_id = null;

    let hasRun = inquirer
    .prompt({
            type: "list",
            name: "department_name",
            message: "Select the Department to delete:",
            choices: departmentArray
    })
    .then(({department_name}) => {
        return returnDepartmentId(department_name)})
    .then((returned_department_id) => {
        department_id = returned_department_id;
        // is the department associated with a role --> does department_id in role = department_id
        return isDepartment(department_id)})
    .then((is_department) => {
        if (is_department) {
            console.log("You cannot delete a department that is associated with a role.");
            return true;
        } else {
            // deleteDepartment(id);
            return deleteDepartment(department_id);
        }    
    });
   
    return hasRun;    
}

async function caseDeleteRole() {
    // This is an array of choices for the menu prompt below - used await because it was simpler and it worked
    const roleArray = await queryAllRoles();
    // Global variables defined for use in the .then functions
    let role_id = null;

    let hasRun = inquirer
    .prompt({
            type: "list",
            name: "role_name",
            message: "Select the Role to delete:",
            choices: roleArray
    })
    .then(({role_name}) => {
        return returnRoleId(role_name)})
    .then((returned_role_id) => {
        role_id = returned_role_id;
        // is the role_id being used --> is it found in the role_id field in the employee table
        return isRole(role_id) })
    .then((is_role) => {
        if (is_role) {
            console.log("The selected role is in use and cannot be deleted.");
            return true;
        } else {
            // deleteRole(id);
            return deleteRole(role_id)  
        }
    });    
    

    return hasRun;
}

module.exports = {
                    caseDeleteEmployee,
                    caseDeleteDepartment,
                    caseDeleteRole
                };