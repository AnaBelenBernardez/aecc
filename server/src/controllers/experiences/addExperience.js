const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const addExperienceSchema = require('../../schemas/addExperienceSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addExperience (req,res,next) {
    try{
        const insertedPhotos = [];
        const pool = await getPool();

        const { name, content } = req.body;
        const photos = req.files?.photo;

        

        const {error} = addExperienceSchema.validate(req.body);


        if (error) {
            return next(generateError(error.message, 400));
        }

        if(!req.files){
            return next(generateError('Es obligario anexar al menos una imagen', 400));
        }
        if(req.files.length !== 1){
            return next(generateError('Sólo es posible anexar una imagen', 400));
        }

        await photoSchema.validateAsync(photos);

        const [newExperience] = await pool.query(
            `
            INSERT INTO experiences (name, content)
            VALUES (?,?)`,
            [name, content]
        );

        const {insertId} = newExperience;

     
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO experiences_photos (experience_id, photo) VALUES (?, ?)',
                [insertId, photoName]
            );
            insertedPhotos.push(photoName);

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