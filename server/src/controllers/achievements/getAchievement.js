const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

async function getAchievement (req,res,next) {
    try{

        const {idAchievement} = req.params;

        const pool = await getPool();

        const [achievement] = await pool.query(
            `
                SELECT *
                FROM achievements
                WHERE id=?
            `,
            [idAchievement]
        );

        if(!achievement.length){
            return next(generateError('No se ha podido encontrar el logro', 404));
        }

        res.status(200).send({
            status: "OK",
            data: achievement
        });

    }catch(e){
        console.log(e);
        next(e);
    }
} 


module.exports = getAchievement;