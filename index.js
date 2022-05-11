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
const {queryAllRoleData, addRole, deleteRole} = require('./lib/role');
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

function displayAddMenu() {
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
                                console.log('Please enter a name for your Manager!');
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
                        type: "number",
                        name:   "department_id",
                        message: "Please enter department id:",
                        validation: idInput => {
                            if (Number.isInteger(idInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the department id!');
                                return false;
                            }
                        }
                    }
                ])
                .then((inputDataArray) => {
                    console.log(inputDataArray.title, inputDataArray.salary, inputDataArray.department_id);
                    addRole(inputDataArray.title, inputDataArray.salary, inputDataArray.department_id)
                        .then((istrue) => {
                            if (istrue) {
                                displayInitialMenu();
                            }
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
                        type: "number",
                        name:   "role_id",
                        message: "Please enter the role id:",
                        validation: role_idInput => {
                            if (Number.isInteger(role_idInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the role id!');
                                return false;
                            }
                        }
                    },
                    {
                        type: "number",
                        name:   "manager_id",
                        message: "Please enter the manager id:",
                        validation: manager_idInput => {
                            if (Number.isInteger(manager_idInput)) {
                                return true;
                            } else {
                                console.log('Please enter an integer for the manager id!');
                                return false;
                            }
                        }
                    }
                ])
            .then((inputDataArray) => {
                    addAnEmployee(inputDataArray.first_name, inputDataArray.last_name, inputDataArray.role_id, inputDataArray.manager_id)
                        .then((istrue)=> {
                            if(istrue) {
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





// updateEmployeeRole(id,role);
// updateEmployeeManager(id, manager_id);
// deleteAnEmployee(id);


// deleteDepartment(id);


// deleteRole(id);


startup();
