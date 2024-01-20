const {getPool} = require('../../database/db');

async function deleteFaq (req,res,next) {
    try {
        
        const pool = await getPool();
        const {idFaq} = req.params;

        await pool.query(`DELETE FROM faqs WHERE id=?`,[idFaq]);

        res.status(200).send({
            status: 'OK',
            message: `Se ha eliminado la FAQ correctamente`
        });

    } catch (e) {
        console.log(e)
        next(e);
    }
}
module.exports = deleteFaq;