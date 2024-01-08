const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const addEventSchema = require('../../schemas/addEventSchema');
const generateError = require('../../helpers/generateError');


async function addEvent (req,res,next) {
    try{
        //! Revisar unique content
        const connect = await getPool();

        const { title, content, location, date_start, date_end, event_type, link } = req.body;


        const {error} = addEventSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        if(!req.files){
            return next(generateError('Es obligario anexar al menos una imagen', 400));
            
        }

        const [newEvent] = await connect.query(
            `
                INSERT INTO events (create_date, title, content, location, date_start, date_end, link, event_type, id)
                VALUES (?,?,?,?,?,?,?,?,DEFAULT)
            `,
            [new Date(), title, content, location, new Date(date_start), new Date(date_end), link, event_type] 
        );

        const {insertId} = newEvent;

        if(req.files && Object.keys(req.files).length > 0){
            console.log(req.files)
            for(let photoData of Object.values(req.files)){
                //puse 400 de width por poner algo, imagino que esto habrá que mirarlo con el front
                const photoName =  await savePhoto(photoData, 400);
                await connect.query(
                    `
                        INSERT INTO events_photos (photo, event_id)
                        VALUES (?,?)
                    `,
                    [photoName, insertId]
                )
            }
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