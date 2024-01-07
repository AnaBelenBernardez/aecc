const {getPool} = require('../../database/db');

async function getAllExperiences (req, res, next) {
  try {
    const pool = await getPool();

    const [experiences] = await pool.query(`SELECT e.id, e.name, e.content, ep.photo, ep.photo_date
    FROM experiences e
    LEFT JOIN experiences_photos ep ON e.id = ep.experience_id;`
    );
    
    res.status(200).send({
      status: 'Ok',
      message: 'Experiencias disponibles',
      data: {
        experiences
      }

    });

  } catch (error) {
    next(error);
  };

}

module.exports = getAllExperiences;