const {getPool} = require("../../database/db");
const generateError = require('../../helpers/generateError');
const experienceSchema = require('../../schemas/experienceSchema');
const { photoSchema, arrayPhotoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const deletePhoto = require('../../helpers/deletePhoto');


async function editExperience (req,res,next) {
    try{

        const {idExperience} = req.params;
        const pool = await getPool();

        const insertedPhotos = [];

        const photos = req.files?.photo;
        let photoErrorSchema;

        if (photos && photos.length > 1) {
            return next(generateError('Has subido demasiadas fotos. Máximo 400', 400));
        }

       if (photos) { 
        await photoSchema.validateAsync(photos) 
    }
        
        if (photoErrorSchema) {
            return next(generateError(errorSchema.details[0].message, 400));
        }
        
        const {error} = experienceSchema.validate(req.body);
        
        if (error) {
            return next(generateError(error.message, 400));
        }

        const { name, content, galician_content } = req.body;

        if (photos) {
                const [photoToDelete] = await pool.query('SELECT photo FROM experiences_photos WHERE experience_id = ?', [idExperience])

                const photoName = await savePhoto(photos, 500);
                await pool.query(
                    'UPDATE experiences_photos SET photo = ? WHERE experience_id = ?',
                    [photoName, idExperience]
                );
                
                if (photoToDelete[0]?.photo) {
                    deletePhoto(photoToDelete[0].photo);
                }

                insertedPhotos.push(photoName);
            }


        const [editedExperience] = await pool.query(
            `
                UPDATE experiences 
                SET name = ?, content = ?, galician_content = ? 
                WHERE id = ?
            `,
            [name, content, galician_content, idExperience] 
        );

        const [updatedExperience] = await pool.query(
            `
                SELECT *
                FROM experiences e
                WHERE e.id=?
            `,
            [idExperience]
        );

        
        res.status(200).send({
            status: "OK",
            data: updatedExperience,
            infoEdited: editedExperience
        });

    } catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = editExperience;