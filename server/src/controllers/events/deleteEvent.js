const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');

async function deleteEvent (req,res,next) {
    try {      
        const pool = await getPool();
        const {idEvent} = req.params;

        const [photos] = await pool.query(
            `
                SELECT photo
                FROM events_photos
                WHERE event_id=?
            `,
            [idEvent]
        );
    
        if(photos.length > 0){
            await pool.query(`DELETE FROM events_photos WHERE event_id=?`,[idEvent]);

                    for(let item of photos){
                        await deletePhoto(item.photo);
                    }
        }

        await pool.query(`DELETE FROM events WHERE id=?`,[idEvent]);

        res.status(200).send({
            status: 'OK',
            message: `El evento y sus fotos han sido eliminados`
        });

    } catch (e) {
        console.log(e)
        next(e);
    }
}
module.exports = deleteEvent;