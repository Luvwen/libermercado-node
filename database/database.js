const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libremercado'
});

// try {
//     db.connect();
//     console.log('Mysql conectado!');
// } catch (error) {
//     console.log(error);
// }

module.exports = db;
