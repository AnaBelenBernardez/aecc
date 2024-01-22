const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');


async function getAllSponsors (req,res,next){
    try{

        const pool = await getPool();

        let [sponsors] = await pool.query(
            `
            SELECT *
            FROM sponsors
            `
        );


        if(sponsors.length === 0){
            return next(generateError('Actualmente no hay patrocinios para mostrar', 404));
        }

        res.status(200).send({
            status: 'OK',
            data: sponsors
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = getAllSponsors;