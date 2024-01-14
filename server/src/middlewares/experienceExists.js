const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const experienceExists = async (req,res,next) => {
    let pool;

    try {
        const {idExperience} = req.params;
        pool = await getPool();

        const [experience] = await pool.query(
            `
                SELECT id
                FROM experiences
                WHERE id=?
            `,
            [idExperience]
        );
        
        if(!experience.length){
            return next(generateError('No se ha podido encontrar la experiencia', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = experienceExists;