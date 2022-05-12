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
       } = require('./lib/employee');
// These are all the department table related queries       
const {
        queryAllDepartmentData,
        addDepartment,
        deleteDepartment,
        queryAllDepartments,
        returnDepartmentId
       } = require('./lib/department');
// These are all the role table related queries       
const {
        queryAllRoleData,
        addRole,
        deleteRole,
        queryAllRoles,
        returnRoleId
     } = require('./lib/role');
// End SQL queries     
const inquirer = require('inquirer');

function startup() {
    console.log(" ");
    console.log("Welcome to the Employee Tracker!");
    console.log(" ");

    displayInitialMenu();
};

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
};

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
                .then((istrue)=> {
                    if(istrue) {
                     displayInitialMenu();   
                    }
                });
                break;
            case "Employees by Manager":
                displayEmployeesByManager();
                break;
            case "Employees by Department":
                displayEmployeesByDepartment();
                break;
            case  "Total Salaries by Department":
                displaySalariesByDepartment();
                break;   
        }
    });
};

async function displayAddMenu() {
    // get the arrays for the menu lists right at the beginning with await operators as these need to be at the top of async functions
    const departmentArray = await queryAllDepartments();
    const roleArray = await queryAllRoles();
    const managersArray = await queryAllManagers();

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
        switch (add_menu) {
            case "Department":
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
                break;
            case "Role":
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
                break;
            case "Employee":
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
                break;  
        }
    });

};

async function displayUpdateMenu() {
    // get the arrays for the menu lists right at the beginning with await operators as these need to be at the top of async functions
    const roleArray = await queryAllRoles();
    const employeeArray = await queryAllEmployees();
    const managersArray = await queryAllManagers();

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
                        switch (update_type) {
                            case "Role":
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
                                break;
                            case "Manager":
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
                                break;
                        }
                });
            });
    });
};

// Delete Menu
async function displayDeleteMenu() {
    // get the arrays for the menu lists right at the beginning with await operators as these need to be at the top of async functions
    const roleArray = await queryAllRoles();
    const employeeArray = await queryAllEmployees();
    const departmentArray = await queryAllDepartments();

    // Display menu of Employee/Department/Role for deletion
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
                            if (istrue){
                                displayInitialMenu();
                            }
                        });
                    });
                });
                break;
            case "Department":
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
                            if (istrue){
                                displayInitialMenu();
                            }
                        });
                    });
                });

                break;
            case "Role":
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
                            if (istrue){
                                displayInitialMenu();
                            }
                        });
                    });
                });
                break;
        }
    });
};

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
            .then((istrue)=>{
                if (istrue) {
                   displayInitialMenu(); 
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
                   displayInitialMenu(); 
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
                   displayInitialMenu(); 
                }
                
            });
        });
    });

};

// This starts the application
startup();
