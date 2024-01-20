const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const newsSchema = require("../../schemas/newsSchema");
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');

async function addNews (req,res,next){
    try{
        const insertedPhotos = [];
        const pool = await getPool();

        const photos = req.files?.photo;
        let photoErrorSchema;


        if (photos && photos.length > 30) {
            return next(generateError('Has subido demasiadas fotos. Máximo 30', 400));
        }

        if (Array.isArray(photos)) {
            const { error } = await arrayPhotoSchema.validateAsync(photos);
            photoErrorSchema = error;
        } else {
            await photoSchema.validateAsync(photos);
        }

        if (photoErrorSchema) {
            return next(generateError(errorSchema.details[0].message, 400));
        }
        


        const {error} = newsSchema.validate(req.body);
        
        if (error) {
            return next(generateError(error.message, 400));
        }

        const { title, content, link } = req.body;

        const [previousNewsContent] = await pool.query(
            `
                SELECT *
                FROM news
                WHERE content = ?
            `, [content]
        );

        if(previousNewsContent.length){
            return next(generateError('Ya existe ese contenido en Noticias. Edítalo o elimínalo para evitar contenidos duplicados', 400));
        }

        const [newNews] = await pool.query(
            `
                INSERT INTO news (title, content, link)
                VALUES (?,?,?)
            `,
            [title, content, link] 
        );

        const {insertId} = newNews;

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoName = await savePhoto(photo, 500);

                await pool.query(
                'INSERT INTO news_photos (photo, news_id) VALUES (?, ?)',
                [photoName, insertId]
                );
        
                insertedPhotos.push(photoName);
            }
            } else if (photos) {
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