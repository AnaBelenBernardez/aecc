const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const faqExists = async (req,res,next) => {
    let pool;

    try {
        const {idFaq} = req.params;
        pool = await getPool();

        const [faq] = await pool.query(
            `
                SELECT id
                FROM faqs
                WHERE id=?
            `,
            [idFaq]
        );
        
        if(!faq.length){
            return next(generateError('No se ha podido encontrar la FAQ', 404));
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = faqExists;