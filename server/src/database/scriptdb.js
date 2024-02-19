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
            galician_title VARCHAR(100) NOT NULL,
            content VARCHAR(500) NOT NULL,
            galician_content VARCHAR(500) NOT NULL,
            warning BOOLEAN DEFAULT FALSE,
            warning_content VARCHAR(300),
            galician_warning_content VARCHAR(300),
            location ENUM('Abegondo', 'Ames', 'Aranga', 'Ares', 'Arteixo', 'Arzúa', 'Baña, A', 'Bergondo', 'Betanzos', 'Boimorto', 'Boiro', 'Boqueixón', 'Brion', 'Cabana de Bergantiños', 'Cabanas', 'Camariñas', 'Cambre', 'Capela, A', 'Carballo', 'Cariño', 'Carnote', 'Cedeira', 'Cerceda', 'Cerdido', 'Cesuras', 'Corcubión', 'Coristanco', 'Coruña, A', 'Culleredo', 'Curtis', 'Dodro', 'Dumbria', 'Ferrol', 'Fisterra', 'Frades', 'Irixoa', 'Laracha, A', 'Laxe', 'Lousame', 'Malpica de Bergantiños', 'Mañón', 'Mazaricos', 'Melide', 'Mesía', 'Miño', 'Moeche', 'Monfero', 'Mugardos', 'Muros', 'Muxía', 'Narón', 'Neda', 'Negreira', 'Noia', 'Oleiros', 'Ordes', 'Oroso', 'Ortigueira', 'Outes', 'Oza dos Ríos', 'Padrón', 'Pedrouzo, O', 'Pobra do Caramiñal', 'Ponteceso', 'Pontedeume', 'Pontes de García Rodríguez', 'Poyo, O',  'Ribeira', 'Rois', 'Sada', 'San Sadurniño', 'Santa Comba', 'Santiago de Compostela', 'Santiso', 'Sobrado', 'Somozas, As', 'Teo', 'Toques', 'Tordoia', 'Touro', 'Trazo', 'Val do Dubra', 'Valdoviño', 'Vedra', 'Vilarmaior', 'Vilasantar', 'Vimianzo', 'Zas')
            NOT NULL,
            event_type ENUM('Andainas y carreras', 'Travesía a nado de Ribeira', 'Torneo Pádel contra el Cáncer', 'A Coruña Bike', 'Otros') NOT NULL,
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
            content VARCHAR(500) NOT NULL,
            galician_content VARCHAR(500) NOT NULL
        );
        `
    );

    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS introduction
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            first_title VARCHAR(30) NOT NULL,
            second_title VARCHAR(30) NOT NULL,
            last_title VARCHAR (30) NOT NULL,
            galician_first_title VARCHAR(30) NOT NULL,
            galician_second_title VARCHAR(30) NOT NULL,
            galician_last_title VARCHAR(30) NOT NULL,
            first_paragraph VARCHAR(300) NOT NULL,
            second_paragraph VARCHAR(300) NOT NULL,
            last_paragraph VARCHAR(300) NOT NULL,
            galician_first_paragraph VARCHAR(300) NOT NULL,
            galician_second_paragraph VARCHAR(300) NOT NULL,
            galician_last_paragraph VARCHAR(300) NOT NULL,
            summary VARCHAR(500) NOT NULL,
            galician_summary VARCHAR(500) NOT NULL,
            src_video VARCHAR(200) NOT NULL
        );
        `
    );

    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS news
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(300) NOT NULL,
            galician_title VARCHAR(300) NOT NULL,
            content VARCHAR(1500) NOT NULL,
            galician_content VARCHAR(1500) NOT NULL,
            create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            news_date DATETIME,
            link VARCHAR(500)
        );
        `
    );

    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS achievements
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            description VARCHAR(200),
            galician_description VARCHAR(200),
            icon VARCHAR (500) UNIQUE NOT NULL
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
        CREATE TABLE IF NOT EXISTS news_photos
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            photo VARCHAR (1500),
            photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            news_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (news_id) REFERENCES news(id)
            );
            `
            );
            
    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS banners_photos
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            photo VARCHAR (500),
            photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            banner_id INT NOT NULL,
            FOREIGN KEY (banner_id) REFERENCES banners(id)
        );
        `
    );

    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS sponsors
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(40) UNIQUE NOT NULL,
            galician_name VARCHAR(40) UNIQUE NOT NULL,
            logo VARCHAR (500) UNIQUE NOT NULL,
            description VARCHAR(500),
            galician_description VARCHAR(500),
            important BOOLEAN DEFAULT FALSE,
            link VARCHAR(500)
        )
        `
    )

    await pool.query(

        `
        CREATE TABLE IF NOT EXISTS faqs
        (
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            question VARCHAR(300) UNIQUE NOT NULL,
            galician_question VARCHAR(300) UNIQUE NOT NULL,
            answer VARCHAR(300),
            galician_answer VARCHAR(300)
        )
        `
    )

    await pool.query(
        
        `
        CREATE TABLE banners (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50),
            galician_title VARCHAR(255),
            subtitle VARCHAR(255),
            galician_subtitle VARCHAR(255),
            button_text VARCHAR(50),
            galician_button_text VARCHAR(50),
            button_link VARCHAR(300)
        );
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