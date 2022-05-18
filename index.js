/* eslint-disable no-undef */
// These are all the SQL queries for the application as async functions

// These are all the Employee table related queries
const {
        queryAllEmployeeData,
        queryAllEmployees,
        returnEmployeeId
       } = require('./lib/employee');

// These are all the Department table related queries       
const {
        queryAllDepartmentData
       } = require('./lib/department');

// These are all the Role table related queries       
const {
        queryAllRoleData
     } = require('./lib/role');
// End SQL queries  

// These are the async functions called by the View/Add/Update/Delete Menus

// View Functions
const {
        displayEmployeesByManager,
        displayEmployeesByDepartment,
        displaySalariesByDepartment
    } = require('./lib/view');

// Add Functions
const {
        caseAddDepartment,
        caseAddEmployee,
        caseAddRole
} = require('./lib/add');

// Update Functions
const {
        caseUpdateManager,
        caseUpdateRole
    } = require('./lib/update');

// Delete Functions    
const {
        caseDeleteEmployee,
        caseDeleteDepartment,
        caseDeleteRole
    } = require('./lib/delete');
// End Menu Functions



const inquirer = require('inquirer');

// ********************* Display Welcome Message *********************

function startup() {
    console.log(" ");
    console.log(" ************* Welcome to Employee Tracker! *************");
    console.log(" ");
    console.log("         An application to manage employee data.");
    console.log(" ");

    displayInitialMenu();
}

// **************** Display the initial View/Add/Update/Delete menu *****************

function displayInitialMenu() {

    inquirer
    .prompt(
        {
            type: "list",
            name: "main_menu",
            message: "Please select desired operation:",
            choices: ["View --> Employee/Role/Department", "Add --> Employee/Role/Department", "Update --> Employee/Role/Department", "Delete --> Employee/Role/Department"]
        }
    )
    .then(({main_menu}) => {
        switch (main_menu) {
            case "View --> Employee/Role/Department":
                displayViewMenu();
                break;
            case "Add --> Employee/Role/Department":
                displayAddMenu();
                break;
            case "Update --> Employee/Role/Department":
                displayUpdateMenu();
                break;
            case "Delete --> Employee/Role/Department":
                displayDeleteMenu();
                break;
        }
    });
}

// ******************** Display View menu ********************

function displayViewMenu() { 
    inquirer
    .prompt(
        {
            type: "list",
            name: "view_menu",
            message: "Please select desired View operation:",
            choices: ["All Departments", "All Roles", "All Employees", "Employees by Manager", "Employees by Department", "Total Salaries by Department"]
        }
    )
    .then(({view_menu}) => {
         switch (view_menu) {
            // For the first three cases, included all the code here because it was fairly short.
            case "All Departments":
                queryAllDepartmentData()
                .then((istrue) => {
                    if (istrue) {
                        displayInitialMenu();
                    }
                });
                break;
            case "All Roles":
                queryAllRoleData()
                .then((istrue) => {
                    if (istrue) {
                        displayInitialMenu();
                    }
                });
                break;
            case "All Employees":
                queryAllEmployeeData()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;

            // The three cases below call three separate async functions becuase it was too much code to include here.    
            case "Employees by Manager":
                displayEmployeesByManager()
                .then((istrue) => {
                    if (istrue) {
                       displayInitialMenu();
                    } 
                });
                break;
            case "Employees by Department":
                displayEmployeesByDepartment()
                .then((istrue) => {
                    if (istrue) {
                       displayInitialMenu();
                    } 
                });
                break;
            case  "Total Salaries by Department":
                displaySalariesByDepartment()
                .then((istrue) => {
                    if (istrue){
                        displayInitialMenu();
                    } 
                });
                break;   
        }
    });
}

// ***************** Display Add Menu *****************

function displayAddMenu() {
    // get the arrays for the menu lists right at the beginning with await operators as these need to be at the top of async functions

    inquirer
    .prompt(
        {
            type: "list",
            name: "add_menu",
            message: "Please select desired Add operation:",
            choices: ["Department", "Role", "Employee"]
        }
    )
    .then(({add_menu}) => {
        // All cases implemented by called async functions
        switch (add_menu) {
            case "Department":
                caseAddDepartment()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;
            case "Role":
                caseAddRole()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;
            case "Employee":
                caseAddEmployee()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;  
        }
    });

}

// **************** Display Update Menu *****************

async function displayUpdateMenu() {
    // get the arrays for the menu lists right at the beginning with await operators as these need to be at the top of async functions
    const employeeArray = await queryAllEmployees();

    // Start update function by displaying a list of employees to select from - use employeeArray for choices
    inquirer
    .prompt(
        {
            type: "list",
            name: "employee_name",
            message: "Please select the Employee you wish to update:",
            choices: employeeArray
        }
    )
    .then(({employee_name}) => {
        returnEmployeeId(employee_name)
            .then((employee_id) => {
                inquirer
                .prompt ({
                        type: "list",
                        name: "update_type",
                        message: `Please select the update type for ${employee_name}`,
                        choices: ["Role", "Manager"]
                })
                .then(({update_type}) => {
                        // Implement cases by calling async functions
                        switch (update_type) {
                            case "Role":
                                caseUpdateRole(employee_name, employee_id)
                                .then((istrue) => {
                                    if(istrue) {
                                        displayInitialMenu();   
                                    }
                                });
                                break;
                            case "Manager":
                                caseUpdateManager(employee_name, employee_id)
                                .then((istrue) => {
                                    if(istrue) {
                                        displayInitialMenu();   
                                    }
                                });
                                break;
                        }
                });
            });
    });
}

// ************* Display Delete Menu **************

function displayDeleteMenu() {
    inquirer
    .prompt({
            type: "list",
            name: "deletion_type",
            message: "Select what you want to delete:",
            choices: ["Employee", "Department", "Role"]
    })
    .then(({deletion_type}) => {
        switch (deletion_type) {
            case "Employee":
                caseDeleteEmployee()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;
            case "Department":
                caseDeleteDepartment()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;
            case "Role":
                caseDeleteRole()
                .then((istrue) => {
                    if(istrue) {
                        displayInitialMenu();   
                    }
                });
                break;
        }
    });
}

// ********************* This starts the application ********************
startup();


