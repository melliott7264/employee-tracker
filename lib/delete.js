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

// **************** DELETE Menu Functions ****************

async function caseDeleteEmployee() {
    const employeeArray = await queryAllEmployees();

    inquirer
    .prompt({
            type: "list",
            name: "employee_name",
            message: "Select the Employee to delete:",
            choices: employeeArray
    })
    .then(({employee_name}) => {
        returnEmployeeId(employee_name)
        .then((employee_id) => {
            // deleteAnEmployee(id)
            deleteAnEmployee(employee_id)
            .then((istrue) => {
                if (istrue) {
                    return true;
                }    
            });
        });
    });
};

async function caseDeleteDepartment() {
    const departmentArray = await queryAllDepartments();

    inquirer
    .prompt({
            type: "list",
            name: "department_name",
            message: "Select the Department to delete:",
            choices: departmentArray
    })
    .then(({department_name}) => {
        returnDepartmentId(department_name)
        .then((department_id) => {
            // deleteDepartment(id);
            deleteDepartment(department_id)
            .then((istrue) => {
                if (istrue) {
                    return true;
                }    
            });
        });
    });
};

async function caseDeleteRole() {
    const roleArray = await queryAllRoles();

    inquirer
    .prompt({
            type: "list",
            name: "role_name",
            message: "Select the Role to delete:",
            choices: roleArray
    })
    .then(({role_name}) => {
        returnRoleId(role_name)
        .then((role_id) => {
            // deleteRole(id);
            deleteRole(role_id)
            .then((istrue) => {
                if (istrue) {
                    return true;
                }    
            });
        });
    });
};

module.exports = {
                    caseDeleteEmployee,
                    caseDeleteDepartment,
                    caseDeleteRole
                };