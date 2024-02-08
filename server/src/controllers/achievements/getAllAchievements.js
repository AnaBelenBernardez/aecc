const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');


async function getAllAchievements (req,res,next){
    try{

        const pool = await getPool();

        let [achievements] = await pool.query(
            `
            SELECT *
            FROM achievements
            `
        );


        if(achievements.length === 0){
            return next(generateError('Actualmente no hay logros para mostrar', 404));
        }

        res.status(200).send({
            status: 'OK',
            data: achievements
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = getAllAchievements;