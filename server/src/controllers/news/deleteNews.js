const {getPool} = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');

async function deleteNews (req,res,next) {
    try {
        
        const pool = await getPool();
        const {idNews} = req.params;

        const [photos] = await pool.query(
            `
                SELECT photo
                FROM news_photos
                WHERE news_id=?
            `,
            [idNews]
        );
    
        if(photos.length > 0){
            await pool.query(`DELETE FROM news_photos WHERE news_id=?`,[idNews]);

                    for(let item of photos){
                        await deletePhoto(item.photo);
                    }
        }

        await pool.query(`DELETE FROM news WHERE id=?`,[idNews]);

        res.status(200).send({
            status: 'OK',
            message: `Se ha eliminado la noticia correctamente`
        } );

    } catch (e) {
        console.log(e)
        next(e);
    }
        
}        

module.exports = deleteNews;