const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const addEventSchema = require('../../schemas/addEventSchema');
const generateError = require('../../helpers/generateError');


async function addEvent (req,res,next) {
    try{
        //! Revisar unique content
        const insertedPhotos = [];
        const pool = await getPool();

        const { title, content, location, date_start, date_end, event_type, link } = req.body;
        const photos = req.files?.photo;


        const {error} = addEventSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        if(!req.files){
            return next(generateError('Es obligario anexar al menos una imagen', 400));
            
        }

        const [newEvent] = await pool.query(
            `
                INSERT INTO events (create_date, title, content, location, date_start, date_end, link, event_type, id)
                VALUES (?,?,?,?,?,?,?,?,DEFAULT)
            `,
            [new Date(), title, content, location, new Date(date_start), new Date(date_end), link, event_type] 
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
              'INSERT INTO pet_photos (event_id, photo) VALUES (?, ?)',
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
    }
}

module.exports = addEvent;