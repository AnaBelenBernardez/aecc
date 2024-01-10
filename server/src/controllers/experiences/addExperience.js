const {getPool} = require("../../database/db");
const savePhoto = require('../../helpers/savePhoto');
const generateError = require('../../helpers/generateError');


async function addExperience (req,res,next) {
    try{
        //! Revisar unique content
        const pool = await getPool();

        const { name, content } = req.body;

        if(!name){
            return next(generateError('Es obligatorio introducir un título para la experiencia', 400));
        } 

        if(!content){
            return next(generateError('Es obligatorio introducir el contenido de la experiencia', 400));
        } 

        const [newExperience] = await pool.query(
            `
                INSERT INTO experiences (name, content, id)
                VALUES (?,?,DEFAULT)
            `,
            [name, content] 
        );

        const {insertId} = newExperience;

        if(req.files && Object.keys(req.files).length > 0){
            for(let photoData of Object.values(req.files)){
                //puse 400 de width por poner algo, imagino que esto habrá que mirarlo con el front
                const photoName =  await savePhoto(photoData, 400);
                await pool.query(
                    `
                        INSERT INTO experiences_photos (photo, experience_id)
                        VALUES (?,?)
                    `,
                    [photoName, insertId]
                )
            }
        }

        res.status(200).send({
            status: "OK",
            message: "Entrada creada correctamente",
            data: newExperience
        });
    } catch (e){
        console.log(e)
    }
}

module.exports = addExperience;