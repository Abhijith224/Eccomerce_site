const mysql = require('mysql');
const util=require('util')

const conn= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});




conn.query=util.promisify(conn.query)
module.exports = conn;

