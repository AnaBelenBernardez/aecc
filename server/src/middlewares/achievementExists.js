const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const achievementExists = async (req,res,next) => {
    let pool;

    try {
        const {idAchievement} = req.params;
        pool = await getPool();

        const [achievement] = await pool.query(
            `
                SELECT id
                FROM sponsors
                WHERE id=?
            `,
            [idAchievement]
        );
        
        if(!achievement.length){
            return next(generateError('No se ha podido encontrar el logro', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = achievementExists;