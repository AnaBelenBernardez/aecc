const { getPool } = require("../../database/db");
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const deletePhoto = require("../../helpers/deletePhoto");

async function editBanner(req, res, next) {
    try {
        const { idBanner } = req.params;
        const pool = await getPool();
        const insertedPhotos = [];

        const desktop_photo = req.files?.desktop_photo;
        const mobile_photo = req.files?.mobile_photo;
        const tablet_photo = req.files?.tablet_photo;

        if ((desktop_photo && desktop_photo.length > 1)  || (mobile_photo &&  mobile_photo.length > 1) || (tablet_photo && tablet_photo.length > 1)) {
            return next(generateError('Sólo puedes subir una imagen por tipo de dispositivo.', 400));
        }

        await photoSchema.validateAsync(desktop_photo);
        await photoSchema.validateAsync(mobile_photo);
        await photoSchema.validateAsync(tablet_photo);

        const { title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link } = req.body;


        if (desktop_photo) {
            const [photoToDelete] = await pool.query(
                'SELECT desktop_photo FROM banners_photos WHERE banner_id = ?',
                [idBanner]
            )
            if (photoToDelete.length) {
                await deletePhoto(photoToDelete[0].desktop_photo);
            }
            const desktopPhotoName = await savePhoto(desktop_photo);
            await pool.query(
                'UPDATE banners_photos SET desktop_photo = ? WHERE banner_id = ?',
                [ desktopPhotoName, idBanner ]
            )
    
            insertedPhotos.push(desktopPhotoName);

        } 
        
        if (mobile_photo) {
            const [photoToDelete] = await pool.query(
                'SELECT mobile_photo FROM banners_photos WHERE banner_id = ?',
                [idBanner]
            )
            if (photoToDelete[0].mobile_photo !== null && photoToDelete.length) {
                await deletePhoto(photoToDelete[0].mobile_photo);
            }
            const mobilePhotoName = await savePhoto(mobile_photo);
            await pool.query(
                'UPDATE banners_photos SET mobile_photo = ? WHERE banner_id = ?',
                [ mobilePhotoName, idBanner ]
            )

            insertedPhotos.push(mobilePhotoName);
        } 

        if (tablet_photo) {
            const [photoToDelete] = await pool.query(
                'SELECT tablet_photo FROM banners_photos WHERE banner_id = ?',
                [idBanner]
            )
            if (photoToDelete[0].tablet_photo !== null && photoToDelete.length) {
                await deletePhoto(photoToDelete[0].tablet_photo);
            }
            const tabletPhotoName = await savePhoto(tablet_photo);
            await pool.query(
               'UPDATE banners_photos SET tablet_photo = ? WHERE banner_id = ?',
                [ tabletPhotoName, idBanner ]
            )

            insertedPhotos.push(tabletPhotoName);

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
                LEFT JOIN banners_photos ON banners.id = banners_photos.banner_id
                WHERE banners.id = ?
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
