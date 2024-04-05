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
    )

    process.exit(0);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }
}

updateDB();