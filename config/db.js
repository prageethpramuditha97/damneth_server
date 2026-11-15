
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'damneth',
    password: 'Damneth#456',
    database: 'damneth',
    port: 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
