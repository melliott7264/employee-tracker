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




// addAnEmployee(first_name, last_name, role_id, manager_id);
// updateEmployeeRole(id,role);
// updateEmployeeManager(id, manager_id);
// deleteAnEmployee(id);

// addDepartment(name);
// deleteDepartment(id);

// addRole(title, salary, department_id);
// deleteRole(id);


startup();
