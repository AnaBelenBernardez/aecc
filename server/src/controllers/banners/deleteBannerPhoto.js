const { getPool } = require('../../database/db');
const deletePhoto = require('../../helpers/deletePhoto');
const generateError = require('../../helpers/generateError');

async function deleteBannerPhoto(req, res, next) {
    try {
        const pool = await getPool();
        const { idBanner, idPhoto } = req.params;

        const [current] = await pool.query(
            `
                SELECT photo
                FROM banners_photos
                WHERE id=? AND banner_id=?
            `,
            [idPhoto, idBanner]
        );

        if (!current.length) {
            return next(generateError("La imagen seleccionada no existe o ya ha sido eliminada previamente", 404));
        }

        await deletePhoto(current[0].photo);

        await pool.query(
            `
                DELETE FROM banners_photos
                WHERE id=? AND banner_id=?
            `,
            [idPhoto, idBanner]
        );

        res.status(200).send({
            status: 'OK',
            message: 'Imagen eliminada',
            idPhotoDeleted: idPhoto,
            idBannerOfPhoto: idBanner
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = deleteBannerPhoto;
