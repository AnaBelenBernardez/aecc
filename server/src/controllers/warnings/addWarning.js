const {getPool} = require("../../database/db");

const savePhoto = require('../../helpers/savePhoto');
//const warningSchema = require('../../schemas/warningSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addWarning (req,res,next) {
    try{
        const pool = await getPool();

        const { name, description, link } = req.body;
        const photo = req.files?.warning_photo;

        const {error} = sponsorSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        if(req.files.length > 1){
            return next(generateError('Sólo es posible anexar una imagen por aviso', 400));
        }

        if(req.files){
            await photoSchema.validateAsync(photo);

            const photoName = await savePhoto(photo, 500);

            if(!photoName){
                return next(generateError('Ha ocurrido un error almacenando la imagen', 500));
            }
    
            
        }else{
            
        }
        

        const [duplicateSponsor] = await pool.query(
            `
                SELECT *
                FROM sponsors
                WHERE name = ?
            `, [name]
        );

        if(duplicateSponsor.length){
            return next(generateError('Ya existe ese patrocinio en la web. Edítalo o elimínalo para evitar contenidos duplicados', 400));
        }

        const [newSponsor] = await pool.query(
            `
            INSERT INTO sponsors (name, logo, description, link)
            VALUES (?,?,?,?)`,
            [name, logoName, description, link]
        );



        res.status(200).send({
            status: "OK",
            message: "Se ha añadido el patrocinio correctamente",
            data: newSponsor
        });

    } catch (e){
        console.log(e)
        next(e);
    }
}

module.exports = addWarning;