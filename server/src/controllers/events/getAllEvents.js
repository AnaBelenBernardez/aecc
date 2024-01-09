const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');

async function getAllEvents (req,res,next){
    try{

        const pool = await getPool();


        const eventTypeFilter = req.query?.eventType;
        const locationFilter = req.query?.location;
        const minInterestDate = req.query?.minDate;
        const maxInterestDate = req.query?.maxDate;
        const today = new Date();
        const todayPlusOneYear = new Date(new Date().setFullYear(parseInt(new Date().getFullYear())+1));
        const dateFilter = [minInterestDate === undefined ? today : minInterestDate, maxInterestDate === undefined ? todayPlusOneYear : maxInterestDate]
        const [minDate, maxDate] = dateFilter;

        let events;

        if (eventTypeFilter && locationFilter && dateFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE event_type = ? AND location = ?
            AND e.date_start BETWEEN ? AND ?
            ORDER BY e.date_start DESC`, [eventTypeFilter, locationFilter, minDate, maxDate]);

        } else if (eventTypeFilter && locationFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE event_type = ? AND location = ?
            ORDER BY e.date_start DESC`, [eventTypeFilter, locationFilter]);
        
        } else if (locationFilter && dateFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE location = ?
            AND e.date_start BETWEEN ? AND ?
            ORDER BY e.date_start DESC`, [locationFilter, minDate, maxDate]);

        } else if (dateFilter && eventTypeFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE event_type = ?
            AND e.date_start BETWEEN ? AND ?
            ORDER BY e.date_start DESC`, [eventTypeFilter, minDate, maxDate]);

        } else if (eventTypeFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE event_type = ?
            ORDER BY e.date_start DESC`, [eventTypeFilter]);

        } else if (dateFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE e.date_start BETWEEN ? AND ?
            ORDER BY e.date_start DESC`, [minDate, maxDate]);

        } else if (locationFilter) {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            WHERE location = ?
            ORDER BY e.date_start DESC`, [locationFilter]);

        } else {
            [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
            FROM events e
            ORDER BY e.date_start DESC`);

        }

        if(!events.length){
            return next(generateError('Actualmente no hay ningún evento que cumpla con los parámetros seleccionados', 404));
        }

        res.status(200).send({
            status: 'OK',
            data: events
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getAllEvents;