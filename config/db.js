const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(conn => {
        console.log('Connected to MySQL Database');
        conn.release(); 
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });

module.exports = db;
