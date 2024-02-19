const { getPool } = require("../../database/db");
const generateError = require('../../helpers/generateError');
const bannerSchema = require("../../schemas/bannerSchema");
const { photoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');

async function addBanner(req, res, next) {
    try {
        const insertedPhotos = [];
        const pool = await getPool();

        const photos = req.files?.photo;

        if (photos && photos.length > 1) {
            return next(generateError('Has subido demasiadas fotos. Máximo una', 400));
        }

        await photoSchema.validateAsync(photos);

        const { error } = bannerSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        const { title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link } = req.body;

        const [previousBannerContent] = await pool.query(
            `
                SELECT *
                FROM banners
                WHERE title = ?
            `, [title]
        );

        if (previousBannerContent.length) {
            return next(generateError('Ya existe ese título en Banners. Edítalo o elimínalo para evitar títulos duplicados', 400));
        }

        const [newBanner] = await pool.query(
            `
                INSERT INTO banners (title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link]
        );

        const { insertId } = newBanner;

        if (photos) {
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO banners_photos (photo, banner_id) VALUES (?, ?)',
                [photoName, insertId]
            );
            insertedPhotos.push(photoName);
        }

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido un nuevo banner correctamente",
            data: newBanner
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = addBanner;