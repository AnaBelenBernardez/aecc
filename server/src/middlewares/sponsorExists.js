const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const sponsorExists = async (req,res,next) => {
    let pool;

    try {
        const {idSponsor} = req.params;
        pool = await getPool();

        const [sponsor] = await pool.query(
            `
                SELECT id
                FROM sponsors
                WHERE id=?
            `,
            [idSponsor]
        );
        
        if(!sponsor.length){
            return next(generateError('No se ha podido encontrar el patrocinio', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = sponsorExists;