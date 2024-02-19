const { getPool } = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');

async function deleteBanner(req, res, next) {
    try {

        const pool = await getPool();
        const { idBanner } = req.params;

        const [photos] = await pool.query(
            `
                SELECT photo
                FROM banners_photos
                WHERE banner_id=?
            `,
            [idBanner]
        );

        if (photos.length > 0) {
            await pool.query(`DELETE FROM banners_photos WHERE banner_id=?`, [idBanner]);

            for (let item of photos) {
                await deletePhoto(item.photo);
            }
        }

        await pool.query(`DELETE FROM banners WHERE id=?`, [idBanner]);

        res.status(200).send({
            status: 'OK',
            message: `Se ha eliminado el banner correctamente`
        });

    } catch (e) {
        console.log(e)
        next(e);
    }

}

module.exports = deleteBanner;
