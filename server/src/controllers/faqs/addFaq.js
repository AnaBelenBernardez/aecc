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

        const { question, galician_question, answer, galician_answer } = req.body;

        const [faqQuestion] = await pool.query(
            `
                SELECT *
                FROM faqs
                WHERE question = ? OR galician_question = ?
            `, [question, galician_question]
        );

        if(faqQuestion.length){
            return next(generateError('Ya existe esa pregunta en las FAQs, edítala o elimínala para evitar contenidos duplicados', 400));
        }

        const [faqInfo] = await pool.query(
            `
                INSERT INTO faqs (question, galician_question, answer, galician_answer)
                VALUES (?,?,?,?)
            `,
            [question, galician_question, answer, galician_answer] 
        );

        const {insertId} = faqInfo;

        const [newFaq] = await pool.query(
            `
                SELECT *
                FROM faqs
                WHERE id=?
            `,[insertId]
        )

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido una nueva FAQ correctamente",
            data: newFaq[0]
        });


    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = addFaq;