const {getPool} = require('../../database/db');

async function getAllSponsors (req,res,next){
    try{

        const pool = await getPool();

        let [sponsors] = await pool.query(
            `
            SELECT *
            FROM sponsors
            `
        );

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