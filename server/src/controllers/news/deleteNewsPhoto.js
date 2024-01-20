const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');
const generateError = require('../../helpers/generateError');

async function deleteNewsPhoto(req,res,next) {
    try {
        const connect = await getPool();
        const {idNews, idPhoto} = req.params;

        const [current] = await connect.query(
            `
                SELECT photo
                FROM news_photos
                WHERE id=? AND news_id=?
            `,
            [idPhoto,idNews]
        );
  
        
        if(!current.length){
            return next(generateError("La imagen seleccionada no existe o ya ha sido eliminada previamente", 404));
        }


        
        await deletePhoto(current[0].photo);

        
        await connect.query(
            `
                DELETE FROM news_photos
                WHERE id=? AND news_id=?
            `,
            [idPhoto,idNews]
        );

        res.status(200).send({
            status: 'OK',
            message: 'Imagen eliminada',
            idPhotoDeleted: idPhoto,
            idNewsOfPhoto: idNews
        });
        
    } catch (e) {
        console.log(e);
    }
}

module.exports = deleteNewsPhoto;