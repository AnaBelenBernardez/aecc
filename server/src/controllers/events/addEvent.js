const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const eventSchema = require('../../schemas/eventSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');


async function addEvent (req,res,next) {
    try{
        //! Revisar unique content

        const insertedPhotos = [];
        const pool = await getPool();

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
        
        
        const { title, galician_title, content, galician_content, location, date_start, date_end, event_type, link } = req.body;

        const [previousLink] = await pool.query(
            'SELECT link FROM events WHERE link = ?',
            [link]
        );

        if (previousLink.length > 0) {
            return next(generateError('Ya existe un evento con este link. Edítalo o elimínalo para evitar contenidos duplicados.', 400));
        }
        const [newEvent] = await pool.query(
            `
                INSERT INTO events (create_date, title, galician_title, content, galician_content, location, date_start, date_end, link, event_type, id)
                VALUES (?,?,?,?,?,?,?,?,?,?,DEFAULT)
            `,
            [new Date(), title, galician_title, content, galician_content, location, new Date(date_start), new Date(date_end), link, event_type] 
        );

        const {insertId} = newEvent;

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoName = await savePhoto(photo, 500);

                await pool.query(
                'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                [insertId, photoName]
                );
        
                insertedPhotos.push(photoName);
            }
            } else {
                const photoName = await savePhoto(photos, 500);
                await pool.query(
                    'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                    [insertId, photoName]
                );
                insertedPhotos.push(photoName);
            }

        res.status(200).send({
            status: "OK",
            message: "Evento creado correctamente",
            data: newEvent
        });
    } catch (e){
        console.log(e)
        next(e)
    }
}

module.exports = addEvent;