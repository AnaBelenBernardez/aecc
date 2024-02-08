const {getPool} = require("../../database/db");

const savePhoto = require('../../helpers/savePhoto');
const achievementSchema = require('../../schemas/achievementSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addAchievement (req,res,next) {
    try{
        const pool = await getPool();

        const { description, galician_description } = req.body;
        const icon = req.files?.icon;

        const {error} = achievementSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        if(!req.files){
            return next(generateError('Es obligario anexar al menos un icono', 400));
        }

        if(req.files.length > 1){
            return next(generateError('Sólo es posible anexar un icono por logro', 400));
        }

        await photoSchema.validateAsync(icon);

        const [duplicateAchievement] = await pool.query(
            `
                SELECT *
                FROM achievements
                WHERE description = ?
            `, [description]
        );

        if(duplicateAchievement.length){
            return next(generateError('Ya existe ese logro en la web. Edítalo o elimínalo para evitar contenidos duplicados', 400));
        }

        const iconName = await savePhoto(icon, 500);

        if(!iconName){
            return next(generateError('Ha ocurrido un error almacenando el icono', 500));
        }

        const [newAchievement] = await pool.query(
            `
            INSERT INTO achievements (description, galician_description, icon)
            VALUES (?,?,?)
            `,
            [description, galician_description, iconName]
        );

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido el logro correctamente",
            data: newAchievement
        });

    } catch (e){
        console.log(e)
        next(e);
    }
}

module.exports = addAchievement;