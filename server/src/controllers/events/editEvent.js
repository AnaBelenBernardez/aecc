const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const eventSchema = require('../../schemas/eventSchema');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');


async function editEvent (req,res,next) {
    try{
        //estamos seguros de que queremos obligarles a subir fotos
        //cada vez que quieran editar?

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
        
        const {error} = eventSchema.validate(req.body);
        
        if (error) {
            return next(generateError(error.message, 400));
        }

        const { title, content, warning, location, date_start, date_end, event_type, link } = req.body;

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


        const [editedEvent] = await pool.query(
            `
                UPDATE events 
                SET last_update = ?,title = ?, content = ?, warning = ?, location = ?, date_start = ?, date_end = ?, event_type = ?, link = ?, edited = 1
                WHERE id = ?
            `,
            [new Date(), title, content, warning, location, date_start, date_end, event_type, link, idEvent] 
        );

        const [updatedEvent] = await pool.query(
            `
                SELECT *
                FROM events e
                WHERE e.id=?
            `,
            [idEvent]
        );

        
        res.status(200).send({
            status: "OK",
            data: updatedEvent,
            infoEdited: editedEvent
        });

    } catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = editEvent;