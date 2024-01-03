"use strict";

const {createDBconnection} = require('./db');

require('dotenv').config();

const dbName = process.env.DB_NAME;

const adminPass = process.env.ADMIN_PASS;

async function createDB() {

    let connection;

    try {
    connection = await createDBconnection();
    
    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);

    await connection.query(`CREATE DATABASE ${dbName}`);

    await connection.query(`USE ${dbName}`);

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS admins
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            admin_name VARCHAR(40) UNIQUE NOT NULL,
            pwd VARCHAR(512) NOT NULL,
            create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS events
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            last_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            date_start DATETIME NOT NULL,
            date_end DATETIME NOT NULL,
            edited BOOLEAN DEFAULT FALSE,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(5000) NOT NULL,
            location VARCHAR(200) NOT NULL,
            link VARCHAR(500)
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS experiences
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(40) UNIQUE NOT NULL,
            content VARCHAR(5000) NOT NULL
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS photos
        (
                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                photo VARCHAR (500),
                photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                event_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (event_id) REFERENCES events(id)
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS experiences_photos
        (
                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                photo VARCHAR (500),
                photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                experience_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (experience_id) REFERENCES experiences(id)
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS news
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(5000) NOT NULL,
            event_id INT UNSIGNED NOT NULL,
            link VARCHAR(500),
            FOREIGN KEY (event_id) REFERENCES events(id)
        );
        `
    );

    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS news
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(5000) NOT NULL,
            event_id INT UNSIGNED NOT NULL,
            link VARCHAR(500),
            FOREIGN KEY (event_id) REFERENCES events(id)
        );
        `
    );

    await connection.query(
        `
            CREATE TABLE IF NOT EXISTS sponsors
            (
                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(40) UNIQUE NOT NULL,
                logo VARCHAR (500),
                description VARCHAR(500) NOT NULL,
                link VARCHAR(500)
            )
        `
    )

    await connection.query(
        `INSERT INTO admins (id, admin_name, pwd, create_date) VALUES (DEFAULT, 'admin', 'SHA2(${adminPass}, 512)', DEFAULT)`
    );


    console.log(`Si existía una base de datos con el mismo nombre se ha eliminado. Además, se ha creado una nueva base de datos con el nombre "${dbName}" y sus correspondientes tablas.`);

    }catch(e){

        console.log(e);

    }finally{

        if (connection){
            connection.release();
        }

        process.exit();

    }

}

createDB();