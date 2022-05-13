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

// ************** ADD Menu Functions ***************

// Function called from Add menu
async function caseAddDepartment() {

    inquirer
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
    .then((inputDataArray) => {
        addDepartment(inputDataArray.department)             
        .then((istrue) => {
            if (istrue) {
            displayInitialMenu();
            }
            });
        });
};

// This function called from Add menu
async function caseAddRole() {
    const departmentArray = await queryAllDepartments();

    inquirer
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
    .then((inputDataArray) => {
        returnDepartmentId(inputDataArray.department_name)
        .then((department_id) => {
            addRole(inputDataArray.title, inputDataArray.salary, department_id)
                .then((istrue) => {
                    if (istrue) {
                        displayInitialMenu();
                    }
                });
        });
    });
};

async function caseAddEmployee() {
    const roleArray = await queryAllRoles();
    const managersArray = await queryAllManagers();

    inquirer
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
    .then((inputDataArray) => {
        returnRoleId(inputDataArray.role)
            .then((role_id) => {
                returnManagerId(inputDataArray.manager)
                    .then((manager_id) => {
                        addAnEmployee(inputDataArray.first_name, inputDataArray.last_name, role_id, manager_id)
                            .then((istrue)=> {
                                if(istrue) {
                                displayInitialMenu();   
                                }
                            });
                    });
            });                  
    });
};

module.exports = {
                    caseAddDepartment,
                    caseAddEmployee,
                    caseAddRole
                };