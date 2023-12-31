"use strict";

const {createDBconnection} = require('./db');

require('dotenv').config();

const dbName = process.env.DB_NAME;

const adminPass = process.env.ADMIN_PASS;

async function createDB() {


    
    try {
    const pool = await createDBconnection();
    
    await pool.query(`DROP DATABASE IF EXISTS ${dbName}`);

    await pool.query(`CREATE DATABASE ${dbName}`);

    await pool.query(`USE ${dbName}`);

    await pool.query(

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


    await pool.query(

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
            location ENUM('Abegondo', 'Ames', 'Aranga', 'Ares', 'Arteixo', 'Arzúa', 'Baña, A', 'Bergondo', 'Betanzos', 'Boimorto', 'Boiro', 'Boqueixón', 'Brion', 'Cabana de Bergantiños', 'Cabanas', 'Camariñas', 'Cambre', 'Capela, A', 'Carballo', 'Cariño', 'Carnote', 'Cedeira', 'Cerceda', 'Cerdido', 'Cesuras', 'Corcubión', 'Coristanco', 'Coruña, A', 'Culleredo', 'Curtis', 'Dodro', 'Dumbria', 'Ferrol', 'Fisterra', 'Frades', 'Irixoa', 'Laracha, A', 'Laxe', 'Lousame', 'Malpica de Bergantiños', 'Mañón', 'Mazaricos', 'Melide', 'Mesía', 'Moeche', 'Monfero', 'Mugardos', 'Muros', 'Muxía', 'Narón', 'Neda', 'Negreira', 'Noia', 'Oleiros', 'Ordes', 'Oroso', 'Ortigueira', 'Outes', 'Oza dos Ríos', 'Padrón', 'Pedrouzo, O', 'Ponteceso', 'Pontedeume', 'Pontes de García Rodríguez', 'Poyo, O', 'Ribeira', 'Rois', 'Sada', 'San Sadurniño', 'Santa Comba', 'Santiago de Compostela', 'Santiso', 'Sobrado', 'Somozas, As', 'Teo', 'Toques', 'Tordoia', 'Touro', 'Trazo', 'Val do Dubra', 'Valdoviño', 'Vedra', 'Vilarmaior', 'Vilasantar', 'Vimianzo', 'Zas')
            NOT NULL,
            event_type ENUM('Carrera', 'Andaina', 'Travesía a nado', 'Pádel', 'Ruta en bicicleta', 'Otros') NOT NULL,
            link VARCHAR(500)
        );
        `
    );


    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS experiences
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(40) NOT NULL,
            content VARCHAR(5000) NOT NULL
        );
        `
    );


    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS events_photos
        (
                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                photo VARCHAR (500),
                photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                event_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (event_id) REFERENCES events(id)
        );
        `
    );


    await pool.query(

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


    await pool.query(

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


    await pool.query(

        `
            CREATE TABLE IF NOT EXISTS sponsors
            (
                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(40) UNIQUE NOT NULL,
                logo VARCHAR (500) UNIQUE NOT NULL,
                description VARCHAR(500),
                link VARCHAR(500)
            )
        `
    )


    await pool.query(

        `INSERT INTO admins (id, admin_name, pwd, create_date) VALUES (DEFAULT, 'admin', SHA2('${adminPass}', 512), DEFAULT)`
    );


    console.log(`Si existía una base de datos con el mismo nombre se ha eliminado. Además, se ha creado una nueva base de datos con el nombre "${dbName}" y sus correspondientes tablas.`);


    process.exit(0);
    
    }catch(e){

        console.log(e);
        process.exit(1);


    }

}

createDB();