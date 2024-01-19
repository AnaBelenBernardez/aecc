const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const faqSchema = require('../../schemas/faqSchema');

async function editFaq (req,res,next) {
    try{

        const {idFaq} = req.params;
        const pool = await getPool();
        
        const {error} = faqSchema.validate(req.body);
        
        if (error) {
            return next(generateError(error.message, 400));
        }

        const { question, answer } = req.body;

        const [faqQuestion] = await pool.query(
            `
                SELECT *
                FROM faqs
                WHERE question = ?
            `, [question]
        );

        if(faqQuestion.length && faqQuestion[0].id !== parseInt(idFaq)){
            return next(generateError('Ya existe esa pregunta en las FAQs, edítala o elimínala para evitar contenidos duplicados', 400));
        }

        const [editedFaq] = await pool.query(
            `
                UPDATE faqs 
                SET question = ?, answer = ?
                WHERE id = ?
            `,
            [question, answer, idFaq] 
        );

        const [updatedFaq] = await pool.query(
            `
                SELECT *
                FROM faqs f
                WHERE f.id=?
            `,
            [idFaq]
        );

        
        res.status(200).send({
            status: "OK",
            data: updatedFaq,
            infoEdited: editedFaq
        });

    } catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = editFaq;