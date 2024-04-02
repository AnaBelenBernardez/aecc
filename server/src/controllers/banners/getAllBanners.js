const { getPool } = require('../../database/db');

async function getAllBanners(req, res, next) {
    const pool = await getPool();

    try {
        const [banners] = await pool.query(`
            SELECT b.id, b.title, b.galician_title, b.subtitle, b.galician_subtitle, b.button_text, b.galician_button_text, b.button_link, bp.desktop_photo, bp.mobile_photo, bp.tablet_photo, bp.photo_date
            FROM banners b
            LEFT JOIN banners_photos bp ON b.id = bp.banner_id;
        `);

        res.status(200).send({
            status: 'OK',
            data: banners
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = getAllBanners;
