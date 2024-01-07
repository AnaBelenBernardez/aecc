const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');


async function addEvent (req,res) {
    try{

        const connect = await getPool();

        const { title, content, location, date_start, date_end, link, event_type } = req.body;

        if(!title){

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir un título para el evento"
            });
        } 

        if(!content){

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir una breve descripción del evento"
            });
        } 

        if(!location){

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir una localización para el evento"
            });
        } 

        if(!date_start){

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir una fecha de inicio para el evento"
            });
        } 

        if(!date_end){

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir la fecha en la que finaliza el evento"
            });
        } 
        

        if(!link){
            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir un link que redireccione a la página del evento"
            });
        }

        if(!event_type){
            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir el tipo de evento"
            });
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
                        INSERT INTO photos (photo, event_id)
                        VALUES (?,?)
                    `,
                    [photoName, insertId]
                )
            }
        }

        res.status(200).send({
            status: "OK",
            message: "Entrada creada correctamente",
            data: newEvent
        });
    } catch (e){
        console.log(e)
    }
}

module.exports = addEvent;