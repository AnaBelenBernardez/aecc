const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

async function getEvent (req,res,next) {
    try{

        const {idEvent} = req.params;

        const pool = await getPool();

        /* const [event] = await connect.query(
            `
                SELECT e.id, e.date_start, e.date_end, e.title, e.galician_title, e.content, e.galician_content, e.warning, e.warning_content, e.galician_warning_content, e.location, e.event_type, e.link, GROUP_CONCAT(ep.id) AS photos_ids, GROUP_CONCAT(ep.photo) AS event_photos, ep.event_id AS event_id_photo
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE e.id=?
                GROUP BY e.id
            `,
            [idEvent]
        );

        if(!event[0].photos_ids.includes(",")){
            event[0].photos_ids = new Array(event[0].photos_ids);
        }else{
            event[0].photos_ids = event[0].photos_ids.split(",");
        }

        if(!event[0].event_photos.includes(",")){
            event[0].event_photos = new Array(event[0].event_photos);
        }else{
            event[0].event_photos = event[0].event_photos.split(",");
        } */

        const [event] = await pool.query(
            `
                SELECT id, date_start, date_end, title, galician_title, content, galician_content, warning, warning_content, galician_warning_content, location, event_type, link
                FROM events
                WHERE id=?
            `,[idEvent]

        );

        if(!event.length){
            return next(generateError('No se ha podido encontrar el evento', 404));
        }

        const [photos] = await pool.query(
            `
                SELECT *
                FROM events_photos
                WHERE event_id = ?
            `,[idEvent]
        );


        res.status(200).send({
            status: "OK",
            data: event, photos
        });
    } catch(e){
        console.log(e);
        next(e);
    }
} 


module.exports = getEvent;