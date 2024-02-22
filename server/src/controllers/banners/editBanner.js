const { getPool } = require("../../database/db");
const generateError = require('../../helpers/generateError');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const deletePhoto = require("../../helpers/deletePhoto");

async function editBanner(req, res, next) {
    try {
        const { idBanner } = req.params;
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
            return next(generateError(photoErrorSchema.details[0].message, 400));
        }

        const { title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link } = req.body;

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoName = await savePhoto(photo, 500);

                await pool.query(
                    'INSERT INTO banners_photos (banner_id, photo) VALUES (?, ?)',
                    [idBanner, photoName]
                )

                insertedPhotos.push(photoName);

            }

        } else if (photos) {
            const [photoToDelete] = await pool.query(
                'SELECT photo FROM banners_photos WHERE banner_id = ?',
                [idBanner]
            )
            if (photoToDelete.length) {
                await deletePhoto(photoToDelete[0].photo);
                await pool.query(
                    'DELETE FROM banners_photos WHERE banner_id = ?',
                    [idBanner]
                )
            }
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO banners_photos (banner_id, photo) VALUES (?, ?)',
                [idBanner, photoName]
            )
            insertedPhotos.push(photoName);

        }

        const [editedBanner] = await pool.query(
            `
                UPDATE banners
                SET  title = ?, galician_title = ?, subtitle = ?, galician_subtitle = ?, button_text = ?, galician_button_text = ?, button_link = ?
                WHERE id = ?
            `,
            [title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link, idBanner]
        )

        const [updatedBanner] = await pool.query(

            `
                SELECT *
                FROM banners
                WHERE id = ?
            `,
            [idBanner]

        )

        res.status(200).send({
            status: "OK",
            data: updatedBanner,
            infoEdited: editedBanner
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = editBanner;
