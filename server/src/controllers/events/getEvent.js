const {getPool} = require('../../database/db');

async function getEvent (req,res) {
    try{

        const {idEvent} = req.params;

        const connect = await getPool();

        const [event] = await connect.query(
            `
                SELECT *
                FROM events e
                WHERE e.id=?
            `,
            [idEvent]
        );


        if(!event.length){

            return res.status(400).send({
                status: 'Error',
                message: 'Ha intentado acceder a un evento que no existe'
            });
        }


        //faltan fotos
        
        const [photos] = await connect.query(
            `
                SELECT p.id AS "photo_id", p.photo AS "name_photo"
                FROM events_photos p
                INNER JOIN events e ON p.event_id=?
                WHERE p.event_id
                GROUP BY p.id
            `,
            [idEvent]
        );


        res.status(200).send({
            status: "OK",
            data: [event, photos]
        });
    } catch(e){
        console.log(e);
    }
} 


module.exports = getEvent;