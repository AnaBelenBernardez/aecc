const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

async function getFaq (req,res,next) {
    try{

        const {idFaq} = req.params;

        const connect = await getPool();

        const [faq] = await connect.query(
            `
                SELECT f.id, f.question, f.answer
                FROM faqs f
                WHERE id = ?
            `,
            [idFaq]
        );

        if(!faq.length){
            return next(generateError('No se ha podido encontrar la FAQ', 404));
        }

        res.status(200).send({
            status: "OK",
            data: faq
        });
    } catch(e){
        console.log(e);
    }
} 


module.exports = getFaq;