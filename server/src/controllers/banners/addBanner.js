const { getPool } = require("../../database/db");
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');

async function addBanner(req, res, next) {
    try {
        const insertedPhotos = [];
        const pool = await getPool();

        const desktop_photo = req.files?.desktop_photo;
        const mobile_photo = req.files?.mobile_photo;
        const tablet_photo = req.files?.tablet_photo;

        if(!desktop_photo) return next(generateError('Es obligatorio subir al menos una foto para el banner en formato escritorio.', 400));

        if ((desktop_photo && desktop_photo.length > 1)  || (mobile_photo &&  mobile_photo.length > 1) || (tablet_photo && tablet_photo.length > 1)) {
            return next(generateError('Sólo puedes subir una imagen por tipo de dispositivo.', 400));
        }

        await photoSchema.validateAsync(desktop_photo);
        await photoSchema.validateAsync(mobile_photo);
        await photoSchema.validateAsync(tablet_photo);


        const { title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link } = req.body;

       
        const [newBanner] = await pool.query(
            `
                INSERT INTO banners (title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [title, galician_title, subtitle, galician_subtitle, button_text, galician_button_text, button_link]
        );
    
        const { insertId } = newBanner;
            
        if (desktop_photo || mobile_photo || tablet_photo) {
            const desktop_photo_photoName = await savePhoto(desktop_photo);
            const mobile_photo_photoName = await savePhoto(mobile_photo);
            const tablet_photo_photoName = await savePhoto(tablet_photo);
            await pool.query(
                'INSERT INTO banners_photos (desktop_photo, mobile_photo, tablet_photo, banner_id) VALUES (?, ?, ?, ?)',
                [desktop_photo_photoName, mobile_photo_photoName, tablet_photo_photoName, insertId]
            );
            insertedPhotos.push(desktop_photo_photoName, mobile_photo_photoName, tablet_photo_photoName);
        } 
        
        res.status(200).send({
            status: "OK",
            message: "Se ha añadido un nuevo banner correctamente",
            insertedPhotos,
            data: newBanner
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
}

module.exports = addBanner;