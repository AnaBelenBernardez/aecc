const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');

async function deleteAchievement (req,res,next) {
    try{

        const pool = await getPool();
        const {idAchievement} = req.params;

        const [achievement] = await pool.query(
            `
                SELECT icon
                FROM achievements
                WHERE id=?
            `,
            [idAchievement]
        );

        await pool.query(`DELETE FROM achievements WHERE id=?`,[idAchievement]);
        deletePhoto(achievement[0].icon);

        res.status(200).send({
            status: 'OK',
            message: 'El logro y su icono han sido eliminados'
        });

    }catch(e){
        console.log(e)
        next(e);
    }
}
module.exports = deleteAchievement;