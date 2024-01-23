const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const eventSchema = require('../../schemas/eventSchema');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const convertPhotosIds = require('../../helpers/convertPhotosIds');


async function editEvent (req,res,next) {
    try{

        const {idEvent} = req.params;
        const pool = await getPool();

        const insertedPhotos = [];

        const photos = req.files?.photo;
        let photoErrorSchema;

        const {error} = eventSchema.validate(req.body);
        
        if (error) {
            return next(generateError(error.message, 400));
        }

        const { title, galician_title, content, galician_content, warning, warning_content, galician_warning_content, location, date_start, date_end, event_type, link } = req.body;

        const [duplicateEvent] = await pool.query(
            `
            SELECT e.id, e.date_start, e.date_end, e.title, e.galician_title, e.content, e.galician_content, e.warning, e.warning_content, e.galician_warning_content, e.location, e.event_type, e.link, GROUP_CONCAT(ep.id) AS photos_ids, GROUP_CONCAT(ep.photo) AS event_photos
            FROM events e
            LEFT JOIN
            events_photos AS ep ON e.id = ep.event_id
            WHERE e.link=?
            GROUP BY e.id
            `, [link]
        );
        
        convertPhotosIds(duplicateEvent);

        if(duplicateEvent.length && duplicateEvent[0].id !== parseInt(idEvent)){
            return next(generateError('Ya existe ese evento en la web, edítalo o elimínalo para evitar contenidos duplicados', 400));
        }
        
        if(req.files){
            if ((photos.length + duplicateEvent[0].photos_ids.length) > 400){
                return next(generateError('Has subido demasiadas fotos. Máximo 400', 400));
            }

            if (Array.isArray(photos)){
                const { error } = await arrayPhotoSchema.validateAsync(photos);
                photoErrorSchema = error;
            }else{
                await photoSchema.validateAsync(photos);
            }
            
            if (photoErrorSchema){
                return next(generateError(errorSchema.details[0].message, 400));
            }

            if (Array.isArray(photos)){
                for (const photo of photos) {
                    const photoName = await savePhoto(photo, 500);
    
                    await pool.query(
                    'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                    [idEvent, photoName]
                    );
            
                    insertedPhotos.push(photoName);
                }
            }else{
                const photoName = await savePhoto(photos, 500);
                await pool.query(
                    'INSERT INTO events_photos (event_id, photo) VALUES (?, ?)',
                    [idEvent, photoName]
                );
                insertedPhotos.push(photoName);
            }
        }

        const [editedEvent] = await pool.query(
            `
                UPDATE events 
                SET last_update = ?,title = ?, galician_title = ?, content = ?, galician_content = ?, warning = ?, warning_content = ?, galician_warning_content = ?, location = ?, date_start = ?, date_end = ?, event_type = ?, link = ?, edited = 1
                WHERE id = ?
            `,
            [new Date(), title, galician_title, content, galician_content, warning, warning_content, galician_warning_content, location, date_start, date_end, event_type, link, idEvent] 
        );

        const [updatedEvent] = await pool.query(
            `
                SELECT e.id, e.date_start, e.date_end, e.title, e.galician_title, e.content, e.galician_content, e.warning, e.warning_content, e.galician_warning_content, e.location, e.event_type, e.link, GROUP_CONCAT(ep.id) AS photos_ids, GROUP_CONCAT(ep.photo) AS event_photos
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE e.id=?
                GROUP BY e.id
            `,
            [idEvent]
        );

        convertPhotosIds(updatedEvent);

        res.status(200).send({
            status: "OK",
            data: updatedEvent,
            insertedPhotos,
            infoEdited: editedEvent
        });

    } catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = editEvent;