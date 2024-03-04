const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');


async function getAllFaqs (req,res,next){
    try{

        const pool = await getPool();

        let [faqs] = await pool.query
        (
            `
            SELECT *
            FROM faqs
            `
        );

        if(faqs.length === 0){
            return next(generateError('Actualmente no hay FAQs para mostrar', 404));
        }

        faqs.sort((a, b) => b.id - a.id);

        res.status(200).send({
            status: 'OK',
            data: faqs
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = getAllFaqs;