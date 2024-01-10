const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const eventExists = async (req,res,next) => {
    let connect;

    try {
        const {idEvent} = req.params;
        connect = await getPool();

        const [event] = await connect.query(
            `
                SELECT id
                FROM events
                WHERE id=?
            `,
            [idEvent]
        );
        
        if(!event.length){
            return next(generateError('No se ha podido encontrar el evento', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = eventExists;