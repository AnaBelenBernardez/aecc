const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');
const convertPhotosIds = require('../../helpers/convertPhotosIds');

async function getAbsolutelyAllEvents (req,res,next){
    try{

        const pool = await getPool();

      
            let [events] = await pool.query(
                `SELECT e.id, e.date_start, e.date_end, e.title, e.galician_title, e.content, e.galician_content, e.warning, e.warning_content, e.galician_warning_content, e.location, e.event_type, e.link, GROUP_CONCAT(ep.id) AS photos_ids, GROUP_CONCAT(ep.photo) AS event_photos
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                GROUP BY e.id
                ORDER BY e.date_start DESC
            `);


            if(events.length === 0 || events[0].length === 0){
              return next(generateError('Actualmente no hay ningún evento', 404));
          }
          
          convertPhotosIds(events);        
      

        res.status(200).send({
            status: 'OK',
            data: events
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = getAbsolutelyAllEvents;