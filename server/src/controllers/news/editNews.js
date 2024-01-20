const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const newsSchema = require('../../schemas/newsSchema');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');

async function editNews (req,res,next) {

    try {

        const {idNews} = req.params;
        const pool = await getPool();

        const insertedPhotos = [];

        const photos = req.files?.photo;
        let photoErrorSchema;

        if (photos.length > 30) {
            return next(generateError('Has subido demasiadas fotos. Máximo 30', 400));
            
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

        const { title, content, link } = req.body;

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
                SET  title = ?, content = ?, link = ?
                WHERE id = ?
            `,
            [title, content, link, idNews]
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
