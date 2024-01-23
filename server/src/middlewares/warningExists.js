const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const warningExists = async (req,res,next) => {
    let pool;

    try {
        const {idWarning} = req.params;
        pool = await getPool();

        const [warning] = await pool.query(
            `
                SELECT id
                FROM warnings
                WHERE id=?
            `,
            [idWarning]
        );
        
        if(!warning.length){
            return next(generateError('No se ha podido encontrar el aviso', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = warningExists;