const mysql = require('mysql2');

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, PORT } = require('../config');

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: PORT
});

module.exports = db;
