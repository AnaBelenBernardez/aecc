const mysql = require('mysql2/promise');
require('dotenv').config({override: true});

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

let pool;

const getDB = async () => {
    if(!pool){
        pool = mysql.createPool({
            connectionLimit: 10,
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });
    }

    return await pool.getConnection();
};

const createDBconnection = async () => {
    if(!pool){
        pool = mysql.createPool({
            connectionLimit: 10,
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });
    }

    return await pool.getConnection();
};

module.exports = {
    getDB,
    createDBconnection
}