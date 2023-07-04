const mysql = require('mysql2');

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, PORT } = require('../config');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'libremercado'
// });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
});

module.exports = db;
