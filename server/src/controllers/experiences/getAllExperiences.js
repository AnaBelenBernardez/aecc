const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');

async function getAllExperiences (req, res, next) {
  try {
    const pool = await getPool();

    const [experiences] = await pool.query(`SELECT e.id, e.name, e.content, e.galician_content, ep.photo, ep.photo_date
    FROM experiences e
    LEFT JOIN experiences_photos ep ON e.id = ep.experience_id
    ORDER BY ep.photo_date DESC
    `
    );

    if (!experiences.length) {
      return next(generateError('No hay experiencias para mostrar', 404));
    }
    
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