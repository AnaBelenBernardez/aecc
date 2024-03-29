const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const experienceSchema = require('../../schemas/experienceSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addExperience (req,res,next) {
    try{
        const insertedPhotos = [];
        const pool = await getPool();

        const { name, content, galician_content } = req.body;
        const photos = req.files?.photo;

        const [previousExperience] = await pool.query(
            `
                SELECT *
                FROM experiences
                WHERE content = ? OR galician_content = ?
            `, [content, galician_content]
        );

        if(previousExperience.length){
            return next(generateError('Ya existe una experiencia con ese contenido', 400));
        }

        const {error} = experienceSchema.validate(req.body);


        if (error) {
            return next(generateError(error.message, 400));
        }


        if(photos && req.files.length > 1){
            return next(generateError('Sólo es posible anexar una imagen', 400));
        }

        await photoSchema.validateAsync(photos);

        const [newExperience] = await pool.query(
            `
            INSERT INTO experiences (name, content, galician_content)
            VALUES (?,?,?)`,
            [name, content, galician_content]
        );

        const {insertId} = newExperience;

     if (photos) {
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO experiences_photos (experience_id, photo) VALUES (?, ?)',
                [insertId, photoName]
            );
            insertedPhotos.push(photoName);
        }

        res.status(200).send({
            status: "OK",
            message: "Experiencia creada correctamente",
            data: newExperience
        });
    } catch (e){
        console.log(e)
        next(e);
    }
}

module.exports = addExperience;