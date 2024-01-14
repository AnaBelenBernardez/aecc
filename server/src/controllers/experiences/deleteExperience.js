const {getPool} = require("../../database/db");
const deletePhoto = require('../../helpers/deletePhoto');


async function deleteExperience (req,res,next) {
    try {
        //! ECHAR UN OJO AL MANEJO DE ERRORES
        const pool = await getPool();

        const { idExperience } = req.params;

        const [photos] = await pool.query(
            `
                SELECT photo
                FROM events_photos
                WHERE event_id=?
            `,
            [idExperience]
        );

        await pool.query(`DELETE FROM experiences_photos WHERE experience_id=?`,[idExperience])

        for(let item of photos){
            await deletePhoto(item.photo);
        }

        await pool.query(`DELETE FROM experiences WHERE id=?`,[idExperience])
        
        

        res.status(200).send({
            status: 'OK',
            message: `La expericia y sus fotos han sido eliminadas`
        });

    } catch (e){
        console.log(e)
        next(e)
    }
}

module.exports = deleteExperience;
