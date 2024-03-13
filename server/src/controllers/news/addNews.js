const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const newsSchema = require("../../schemas/newsSchema");
const { photoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');

async function addNews (req,res,next){
    try{
        const insertedPhotos = [];
        const pool = await getPool();

        const photos = req.files?.photo;


        if (photos && photos.length > 1) {
            return next(generateError('Has subido demasiadas fotos. Máximo una', 400));
        }

       
        await photoSchema.validateAsync(photos);
      
        //! Lo mismo que en el Edit
        
        // const {error} = newsSchema.validate(req.body);
        
        // if (error) {
        //     return next(generateError(error.message, 400));
        // }

        const { title, galician_title, content, galician_content, news_date, link } = req.body;

        const [previousNewsContent] = await pool.query(
            `
                SELECT *
                FROM news
                WHERE title = ?
            `, [title]
        );

        if(previousNewsContent.length){
            return next(generateError('Ya existe ese título en Noticias. Edítalo o elimínalo para evitar contenidos duplicados', 400));
        }

        const [newNews] = await pool.query(
            `
                INSERT INTO news (title, galician_title, content, galician_content, news_date, link)
                VALUES (?,?,?,?,?,?)
            `,
            [title, galician_title, content, galician_content, news_date, link] 
        );

        const {insertId} = newNews;

       if (photos) {
                const photoName = await savePhoto(photos, 500);
                await pool.query(
                    'INSERT INTO news_photos (photo, news_id) VALUES (?, ?)',
                    [photoName, insertId]
                );
                insertedPhotos.push(photoName);
            }

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido una nueva noticia correctamente",
            data: newNews
        });


    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = addNews;