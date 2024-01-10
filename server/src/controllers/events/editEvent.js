const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');


async function editEvent (req,res) {
    try{

        const {idEvent} = req.params;
        const connect = await getPool();

        const { title, content, location, date_start, date_end, event_type, link } = req.body;

        if(!title){
            return next(generateError('El título es obligatorio', 400));
        }

        if(!content){
            return next(generateError('El contenido es obligatorio', 400));
        }

        if(!location){
            return next(generateError('La localizacion es obligatoria', 400));
        }

        if(!date_start){
            return next(generateError('La fecha de inicio es obligatoria', 400));
        }

        if(!date_end){
            return next(generateError('La fecha de finalización es obligatoria', 400));
        }

        if(!event_type){
            return next(generateError('El tipo de evento es obligatorio', 400));
        }

        if(!link){
            return next(generateError('El link es obligatorio', 400));
        } 

        const [editedEvent] = await connect.query(
            `
                UPDATE events 
                SET last_update = ?,title = ?, content = ?, location = ?, date_start = ?, date_end = ?, event_type = ?, link = ?, edited = 1
                WHERE id = ?
            `,
            [new Date(), title, content, location, date_start, date_end, event_type, link, idEvent] 
        );

        const [updatedEvent] = await connect.query(
            `
                SELECT *
                FROM events e
                WHERE e.id=?
            `,
            [idEvent]
        );

        
        res.status(200).send({
            status: "OK",
            data: updatedEvent,
            infoEdited: editedEvent
        });

    } catch(e){
        console.log(e);
    }
}

module.exports = editEvent;