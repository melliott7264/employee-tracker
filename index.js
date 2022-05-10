const {queryAllEmployeeData, addAnEmployee, deleteAnEmployee, updateEmployeeRole, updateEmployeeManager, queryEmployeeByManager, queryEmployeeByDepartment, queryEmployeeSalaryByDepartment} = require('./lib/employee');
const {queryAllDepartmentData, addDepartment, deleteDepartment} = require('./lib/department');
const {queryAllRoleData, addRole, deleteRole} = require('./lib/role');



queryAllDepartmentData();
queryAllRoleData();
queryAllEmployeeData();

// queryEmployeeSalaryByDepartment(department_id);

// queryEmployeeByManager(manager_id);
// queryEmployeeByDepartment(department.id);
// addAnEmployee(first_name, last_name, role_id, manager_id);
// updateEmployeeRole(id,role);
// updateEmployeeManager(id, manager_id);
// deleteAnEmployee(id);

// addDepartment(name);
// deleteDepartment(id);

// addRole(title, salary, department_id);
// deleteRole(id);

