const {getPool} = require('../../database/db');

async function getAllEvents (req,res){
    try{
        const connect = await getPool();
        
        //faltan filtros (buscador) y fotos

        const [events] = await connect.query(
            `
                SELECT *
                FROM events e
            `
        );

        if(!events.length){

            return res.status(404).send({
                status: `No se han encontrado comentarios`,
                message: 'No hay comentarios'
            });
        }

        events.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));

        res.status(200).send({
            status: 'OK',
            data: events
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getAllEvents;