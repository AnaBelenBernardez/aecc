const mysql = require('mysql2/promise');
require('dotenv').config({override: true});

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

let pool;


const getPool = async () => {
    if(!pool){
        pool = mysql.createPool({

            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            timezone: 'Z'
        });
    }


    return pool

};

const createDBconnection = async () => {
    if(!pool){
        pool = mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });
    }


    return pool
};


module.exports = {getPool, createDBconnection};

