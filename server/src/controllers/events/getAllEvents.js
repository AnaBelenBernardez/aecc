const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');
const { max } = require('../../schemas/addEventSchema');

async function getAllEvents (req,res,next){
    try{

        const pool = await getPool();

        const eventTypeFilter = req.query?.eventType;
        const locationFilter = req.query?.location;
        const minInterestDate = req.query?.minDate;
        const maxInterestDate = req.query?.maxDate;
        const today = new Date();
        const todayPlusOneYear = new Date(new Date().setFullYear(parseInt(new Date().getFullYear())+1));
        let dateFilter = [minInterestDate === undefined ? today : minInterestDate, maxInterestDate === undefined ? todayPlusOneYear : maxInterestDate];
        let [minDate, maxDate] = dateFilter;
        
        if(minDate === today){            
            minDate = `${minDate.getFullYear()}/${minDate.getUTCMonth()+1}/${minDate.getDate()}`;
        }
        if(maxDate === todayPlusOneYear){
            maxDate = `${maxDate.getFullYear()}/${maxDate.getUTCMonth()+1}/${maxDate.getDate()}`;
        }
        const showEvents = [];


        if (eventTypeFilter && locationFilter && dateFilter) {
            const [events] = await pool.query(
                `SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link, GROUP_CONCAT(ep.photo) AS event_photos
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE event_type = ? AND location = ?
                AND e.date_start BETWEEN ? AND ?
                GROUP BY e.id
                ORDER BY e.date_start DESC
            `, [eventTypeFilter, locationFilter, minDate, maxDate]
            );

            showEvents.push(events);

        }else if (locationFilter && dateFilter) {
            const [events] = await pool.query(
                `SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE location = ?
                AND e.date_start BETWEEN ? AND ?
                GROUP BY e.id
                ORDER BY e.date_start DESC`, [locationFilter, minDate, maxDate]
            );

            showEvents.push(events);

        } else if (dateFilter && eventTypeFilter) {
            const [events] = await pool.query(
                `SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE event_type = ?
                AND e.date_start BETWEEN ? AND ?
                GROUP BY e.id
                ORDER BY e.date_start DESC`, [eventTypeFilter, minDate, maxDate]
            );

            showEvents.push(events);
        }else {
        
            const [events] = await pool.query(
                `SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
                FROM events e
                LEFT JOIN
                events_photos AS ep ON e.id = ep.event_id
                WHERE e.date_start BETWEEN ? AND ?
                GROUP BY e.id
                ORDER BY e.date_start DESC`, [minDate, maxDate]
            );
            showEvents.push(events);

        }

        if(!showEvents.length){
            return next(generateError('Actualmente no hay ningún evento que cumpla con los parámetros seleccionados', 404));
        }

        res.status(200).send({
            status: 'OK',
            data: showEvents[0]
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getAllEvents;