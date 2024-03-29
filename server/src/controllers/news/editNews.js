const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const newsSchema = require('../../schemas/newsSchema');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const deletePhoto = require("../../helpers/deletePhoto");

async function editNews (req,res,next) {

    try {

        const {idNews} = req.params;
        const pool = await getPool();

        const insertedPhotos = [];

        const photos = req.files?.photo;
        let photoErrorSchema;

        if (photos && photos.length > 0) {
            return next(generateError('Has subido demasiadas fotos. Máximo 1', 400));
            
        }

        if (Array.isArray(photos)) {
            const { error } = await arrayPhotoSchema.validateAsync(photos);
            photoErrorSchema = error;
        } else if (photos) {
            await photoSchema.validateAsync(photos);
        }

        if (photoErrorSchema) {
            return next(generateError(errorSchema.details[0].message, 400));
        }

        const {error} = newsSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        const { title, galician_title, news_date, link } = req.body;

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoName = await savePhoto(photo, 500);

                await pool.query(
                'INSERT INTO news_photos (news_id, photo) VALUES (?, ?)',
                [idNews, photoName]
                )

                insertedPhotos.push(photoName);

            }

        } else if (photos) {
            const [photoToDelete] = await pool.query(
                'SELECT photo FROM news_photos WHERE news_id = ?',
                [idNews]
            )
            if (photoToDelete.length) {
               await deletePhoto(photoToDelete[0].photo);
               await pool.query(
                   'DELETE FROM news_photos WHERE news_id = ?',
                   [idNews]
               )
            }
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO news_photos (news_id, photo) VALUES (?, ?)',
                [idNews, photoName]
            )
            insertedPhotos.push(photoName);
            
        }

        const [editedNews] = await pool.query(
            `
                UPDATE news
                SET  title = ?, galician_title = ?, news_date = ?, link = ?
                WHERE id = ?
            `,
            [title, galician_title, news_date, link, idNews]
        )

        const [updatedNews] = await pool.query(
            
            `
                SELECT *
                FROM news
                WHERE id = ?
            `,
            [idNews]

        )
            
        res.status(200).send({
            status: "OK",
            data: updatedNews,
            infoEdited: editedNews
        })

} catch(e) {
    console.log(e);
    next(e);
}
}

module.exports = editNews;
