const { getPool } = require('../../database/db');
const generateError = require('../../helpers/generateError');

async function getBanner(req, res, next) {
    const { idBanner } = req.params;
    const pool = await getPool();

    try {
        const [banner] = await pool.query(`
            SELECT b.id, b.title, b.galician_title, b.subtitle, b.galician_subtitle, b.button_text, b.galician_button_text, b.button_link, bp.photo, bp.photo_date
            FROM banners b
            LEFT JOIN banners_photos bp ON b.id = bp.banner_id
            WHERE b.id = ?
        `, [idBanner]);

        if (!banner.length) {
            return next(generateError('No se ha podido encontrar el banner', 404));
        }

        res.status(200).send({
            status: "OK",
            data: banner
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = getBanner;
