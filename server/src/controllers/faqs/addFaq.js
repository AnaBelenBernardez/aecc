const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const faqSchema = require("../../schemas/faqSchema");

async function addFaq (req,res,next){
    try{
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

        if(faqQuestion.length){
            return next(generateError('Ya existe esa pregunta en las FAQs, edítala o elimínala para evitar contenidos duplicados', 400));
        }

        const [newFaq] = await pool.query(
            `
                INSERT INTO faqs (question, answer)
                VALUES (?,?)
            `,
            [question, answer] 
        );

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido una nueva FAQ correctamente",
            data: newFaq
        });


    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = addFaq;