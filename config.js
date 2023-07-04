const DB_HOST = process.env.HOST || 'localhost';
const DB_USER = process.env.USER || 'root';
const DB_PASSWORD = process.env.PASSWORD || '';
const DB_NAME = process.env.NAME || 'libremercado';
const DB_PORT = process.env.PORT || 5406;

module.exports = { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT };
