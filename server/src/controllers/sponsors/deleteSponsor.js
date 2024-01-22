const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');

async function deleteSponsor (req,res,next) {
    try{

        const pool = await getPool();
        const {idSponsor} = req.params;

        const [sponsor] = await pool.query(
            `
                SELECT logo
                FROM sponsors
                WHERE id=?
            `,
            [idSponsor]
        );

        await pool.query(`DELETE FROM sponsors WHERE id=?`,[idSponsor]);
        deletePhoto(sponsor[0].logo);

        res.status(200).send({
            status: 'OK',
            message: 'El patrocinio y su logo han sido eliminados'
        });

    }catch(e){
        console.log(e)
        next(e);
    }
}
module.exports = deleteSponsor;