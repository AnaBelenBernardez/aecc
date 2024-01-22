const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');
const generateError = require('../../helpers/generateError');

async function deletePhotoEvent(req,res,next) {
    try {
        const connect = await getPool();
        const {idEvent, idPhoto} = req.params;

        const [current] = await connect.query(
            `
                SELECT photo
                FROM events_photos
                WHERE id=? AND event_id=?
            `,
            [idPhoto,idEvent]
        );
        
        if(!current.length){
            return next(generateError("La imagen seleccionada ya ha sido eliminada previamente", 404));
        }

        
        await deletePhoto(current[0].photo);

        
        await connect.query(
            `
                DELETE FROM events_photos
                WHERE id=? AND event_id=?
            `,
            [idPhoto,idEvent]
        );

        res.status(200).send({
            status: 'OK',
            message: 'Imagen eliminada',
            idPhotoDeleted: idPhoto,
            idEventOfPhoto: idEvent
        });
        
    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = deletePhotoEvent;