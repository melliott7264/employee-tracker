const mysql = require('mysql2');

// connect to database
const pool = mysql.createConnection(
    {
        host: 'localhost',
        user: 'melliott',
        password: 'vozPvPqu8Lam&FC',
        database: 'employees'
    },
    console.log('Connected to the employee database.')
);

const promisePool = pool.promise();

module.exports = promisePool;