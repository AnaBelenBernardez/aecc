const {getPool} = require("../../database/db");

const savePhoto = require('../../helpers/savePhoto');
const sponsorSchema = require('../../schemas/sponsorSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addSponsor (req,res,next) {
    try{
        const pool = await getPool();

        const { name, description, link } = req.body;
        const logo = req.files?.logo;

        const {error} = sponsorSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        if(!req.files){
            return next(generateError('Es obligario anexar al menos un logo', 400));
        }

        if(req.files.length > 1){
            return next(generateError('Sólo es posible anexar un logo por patrocinio', 400));
        }

        await photoSchema.validateAsync(logo);

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

        const logoName = await savePhoto(logo, 500);

        if(!logoName){
            return next(generateError('Ha ocurrido un error almacenando el logo', 500));
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

module.exports = addSponsor;