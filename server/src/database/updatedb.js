const {createDBconnection} = require('./db');

require('dotenv').config();

const dbName = process.env.DB_NAME;

async function updateDB() {
  try {
    const pool = await createDBconnection();
    await pool.query(`USE ${dbName}`);

    await pool.query(
      `ALTER TABLE events
        MODIFY COLUMN event_type enum(
          'Andainas y carreras',
          'Travesía a nado de Ribeira',
          'Torneo Pádel contra el Cáncer',
          'A Coruña Bike',
          'Otros',
          'Comidas y cenas'
        )
        NOT NULL AFTER location;`
    );

    await pool.query(
      `
        ALTER TABLE news
        MODIFY COLUMN title VARCHAR(500) NOT NULL,
        MODIFY COLUMN galician_title VARCHAR(500) NOT NULL;
      `
    );

    await pool.query(
      `ALTER TABLE faqs
        MODIFY COLUMN question VARCHAR(600),
        MODIFY COLUMN galician_question VARCHAR(600),
        MODIFY COLUMN answer VARCHAR(600),
        MODIFY COLUMN galician_answer VARCHAR(600);`
    )

    process.exit(0);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }
}

updateDB();