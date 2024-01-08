const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');

async function getAllEvents (req,res,next){
    try{

        const pool = await getPool();


    const eventTypeFilter = req.query?.eventType;
    const locationFilter = req.query?.location;
    const dateFilter = req.query?.dateRange;
    const [minDate, maxDate] = dateFilter !== undefined ? dateFilter.split('-') : [];

    let events

    if (eventTypeFilter && locationFilter && dateFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE event_type = ? AND location = ?
        AND e.date_start BETWEEN ? AND ?
        ORDER BY e.date_start DESC`, [eventTypeFilter, locationFilter, minDate, maxDate]);

        if(!events.length){
            return next(generateError('Actualmente no hay ningún evento que cumpla con los requisitos seleccionados', 404));
        }

    } else if (eventTypeFilter && locationFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE event_type = ? AND location = ?
        ORDER BY e.date_start DESC`, [eventTypeFilter, locationFilter]);

        if(!events.length){
            return next(generateError(`Actualmente no hay ningún evento del tipo "${eventTypeFilter}" en ${locationFilter}`, 404));
        }
    
    } else if (locationFilter && dateFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE location = ?
        AND e.date_start BETWEEN ? AND ?
        ORDER BY e.date_start DESC`, [locationFilter, minDate, maxDate]);

        if(!events.length){
            return next(generateError(`Actualmente no hay ningún evento programado para la fecha seleccionada en ${locationFilter}`, 404));
        }

    } else if (dateFilter && eventTypeFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE event_type = ?
        AND e.date_start BETWEEN ? AND ?
        ORDER BY e.date_start DESC`, [eventTypeFilter, minDate, maxDate]);

        if(!events.length){
            return next(generateError(`Actualmente no hay programado ningún evento del tipo "${eventTypeFilter}" en la fecha indicada`, 404));
        }

    } else if (eventTypeFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE event_type = ?
        ORDER BY e.date_start DESC`, [eventTypeFilter]);

        if(!events.length){
            return next(generateError(`Actualmente no hay eventos del tipo "${eventTypeFilter}" programados`, 404));
        }

    } else if (dateFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE e.date_start BETWEEN ? AND ?
        ORDER BY e.date_start DESC`, [minDate, maxDate]);

        if(!events.length){
            return next(generateError('Actualmente no hay eventos programados para la fecha indicada', 404));
        }

    } else if (locationFilter) {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        WHERE location = ?
        ORDER BY e.date_start DESC`, [locationFilter]);

        if(!events.length){
            return next(generateError(`Actualmente no hay eventos programados en ${locationFilter}`, 404));
        }

    } else {
        [events] = await pool.query(`SELECT e.id, e.date_start, e.date_end, e.title, e.content, e.location, e.event_type, e.link
        FROM events e
        ORDER BY e.date_start DESC`);

        if(!events.length){
            return next(generateError('Actualmente no hay eventos para mostrar', 404));
        }
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