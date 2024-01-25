const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

async function getEvent (req,res,next) {
    try{

        const {idEvent} = req.params;

        const pool = await getPool();

        let [event] = await pool.query(
            `
                SELECT id, date_start, date_end, title, galician_title, content, galician_content, warning, warning_content, galician_warning_content, location, event_type, link
                FROM events
                WHERE id=?
            `,[idEvent]

        );

        if(!event.length){
            return next(generateError('No se ha podido encontrar el evento', 404));
        }

        const [event_photos] = await pool.query(
            `
                SELECT *
                FROM events_photos
                WHERE event_id = ?
            `,[idEvent]
        );

        event[0].event_photos = event_photos;

        res.status(200).send({
            status: "OK",
            data: event
        });
    } catch(e){
        console.log(e);
        next(e);
    }
} 


module.exports = getEvent;