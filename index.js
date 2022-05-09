const {queryAllEmployeeData} = require('./lib/employee');
const {queryAllDepartmentData} = require('./lib/department');
const {queryAllRoleData} = require('./lib/role');

queryAllDepartmentData();
queryAllRoleData();
queryAllEmployeeData();
