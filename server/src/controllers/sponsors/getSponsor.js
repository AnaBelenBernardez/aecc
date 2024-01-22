const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

async function getSponsor (req,res,next) {
    try{

        const {idSponsor} = req.params;

        const pool = await getPool();

        const [sponsor] = await pool.query(
            `
                SELECT *
                FROM sponsors
                WHERE id=?
            `,
            [idSponsor]
        );

        if(!sponsor.length){
            return next(generateError('No se ha podido encontrar el patrocinio', 404));
        }

        res.status(200).send({
            status: "OK",
            data: sponsor
        });

    }catch(e){
        console.log(e);
        next(e);
    }
} 


module.exports = getSponsor;