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
        returnManagerId
       } = require('./lib/employee');
const {
        queryAllDepartmentData,
        addDepartment,
        deleteDepartment,
        queryAllDepartments,
        returnDepartmentId
       } = require('./lib/department');
const {
        queryAllRoleData,
        addRole,
        deleteRole,
        queryAllRoles,
        returnRoleId
     } = require('./lib/role');
const inquirer = require('inquirer');

function startup() {
    console.log("Welcome to the Employee Tracker.");
    displayInitialMenu();
};

function displayInitialMenu() {
    inquirer
    .prompt(
        {
            type: "list",
            name: "main_menu",
            message: "Please select desired operation for Employee/Role/Department:",
            choices: ["View", "Add", "Update", "Delete"]
        }
    )
    .then(({main_menu}) => {
        switch (main_menu) {
            case "View":
                displayViewMenu();
                break;
            case "Add":
                displayAddMenu();
                break;
            case "Update":
                displayUpdateMenu();
                break;
            case "Delete":
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
    const roleArray = await queryAllRoles();
    const employeeArray = await queryAllEmployees();
    const managersArray = await queryAllManagers();

    inquirer
    .prompt(
        {
            type: "list",
            name: "add_menu",
            message: "Please select desired Update operation:",
            choices: ["Employee Role", "Employee Manager"]
        }
    )
    .then(({update_menu}) => {
        switch (update_menu) {
            case "Employee Role":
                inquirer
                .prompt ([
                    {
                        // need to list employees and then get the employee id
                        type: "number",
                        name:   "id",
                        message: "Please enter the Employee id:",
                        validation: idInput => {
                            if (Number.isInteger(idInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the Employee id!');
                                return false;
                            }
                        }
                    },
                    {
                        // need to list roles to select and then return the role id
                        type: "number",
                        name:   "role",
                        message: "Please enter the Employee role id:",
                        validation: roleInput => {
                            if (Number.isInteger(roleInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for role id!');
                                return false;
                            }
                        }
                    }

                ])
                .then((inputDataArray) => {
                    updateEmployeeRole(inputDataArray.id, inputDataArray.role)           
                    .then((istrue) => {
                        if (istrue) {
                        displayInitialMenu();
                        }
                     });
                 });
                break;
            case "Employee Manager":
                inquirer
                .prompt ([
                    {
                        // need to list employees to select one and then return id
                        type: "number",
                        name:   "id",
                        message: "Please enter the Employee id:",
                        validation: salaryInput => {
                            if (Number.isInteger(salaryInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the Employee id!');
                                return false;
                            }
                        }
                    },
                    {
                        // need to list managers to select one and then return id
                        type: "number",
                        name:   "manager",
                        message: "Please enter the Manager id:",
                        validation: idInput => {
                            if (Number.isInteger(idInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the Manager id!');
                                return false;
                            }
                        }
                    }
                ])
                .then((inputDataArray) => {
                    updateEmployeeManager(inputDataArry.id, inputDataArray.manager_id)
                        .then((istrue) => {
                            if (istrue) {
                                displayInitialMenu();
                            }
                        });
                });
                break; 
        }
    });
};


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
            queryEmployeeByManager(manager_id)
            .then((istrue)=>{
                if (istrue) {
                   displayInitialMenu(); 
                }
                
            });
        });
    });
  
};

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
            queryEmployeeByDepartment(department_id)
            .then((istrue)=>{
                if (istrue) {
                   displayInitialMenu(); 
                }
                
            });
        });
    });

};

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
            queryEmployeeSalaryByDepartment(department_id)
            .then((istrue)=>{
                if (istrue) {
                   displayInitialMenu(); 
                }
                
            });
        });
    });

};







// deleteAnEmployee(id);

// deleteDepartment(id);

// deleteRole(id);


startup();
