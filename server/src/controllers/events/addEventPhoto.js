const {getPool} = require ('../../database/db');

const savePhoto = require ("../../helpers/savePhoto");
const generateError = require('../../helpers/generateError');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');

async function addEventPhoto (req, res, next){
    try {
        const {idEvent} = req.params;
        const pool = await getPool();
        const insertedPhotos = [];
        const photos = req.files?.photo;
        let photoErrorSchema;

        
        if (!photos || photos.length === 0) {
            return next(generateError('No has subido ninguna foto del evento', 400));
        }

        if (photos.length > 400) {
            return next(generateError('Has subido demasiadas fotos. Máximo 400', 400));
        }

        if (Array.isArray(photos)) {
            const { error } = await arrayPhotoSchema.validateAsync(photos);
            photoErrorSchema = error;
        } else {
            await photoSchema.validateAsync(photos);
        }
        
        if (photoErrorSchema) {
            return next(generateError(errorSchema.details[0].message, 400));
        }
        

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoName = await savePhoto(photo, 500);

                await pool.query(
                    'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                    [idEvent, photoName]
                );
        
                insertedPhotos.push(photoName);
            }
        } else {
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                [idEvent, photoName]
            );
            insertedPhotos.push(photoName);
        }
        

        const [newPhotos] = await pool.query(
            `
                SELECT photo AS name_photo, id AS photo_id
                FROM events_photos
                WHERE event_id = ?
            `,[idEvent]
        )

        if(!newPhotos.length){
            return next(generateError('Ha ocurrido un error almacenando la imagen', 400));
        }


        res.status(200).send({
            status: 'OK',
            message: 'La imagen se cargó correctamente',
            newPhotos: newPhotos
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}
module.exports = addEventPhoto;