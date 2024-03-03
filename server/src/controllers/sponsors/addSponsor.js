const {getPool} = require("../../database/db");

const savePhoto = require('../../helpers/savePhoto');
const sponsorSchema = require('../../schemas/sponsorSchema');
const generateError = require('../../helpers/generateError');
const { photoSchema } = require('../../schemas/photoSchema');


async function addSponsor (req,res,next) {
    try{
        const pool = await getPool();

        const { name, galician_name, description, galician_description, link, important} = req.body;
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
                WHERE name = ? OR galician_name = ?
            `, [name, galician_name]
        );

        if(duplicateSponsor.length){
            return next(generateError('Ya existe ese patrocinio en la web. Edítalo o elimínalo para evitar contenidos duplicados', 400));
        }

        const logoName = await savePhoto(logo, 500);

        if(!logoName){
            return next(generateError('Ha ocurrido un error almacenando el logo', 500));
        }

        const [infoSponsor] = await pool.query(
            `
            INSERT INTO sponsors (name, galician_name, logo, description, galician_description, link, important)
            VALUES (?,?,?,?,?,?,?)`,
            [name, galician_name, logoName, description, galician_description, link, important]
        );

        const {insertId} = infoSponsor;

        const [newSponsor] = await pool.query(
            `
                SELECT *
                FROM sponsors
                WHERE id=?
            `,[insertId]
        )

        res.status(200).send({
            status: "OK",
            message: "Se ha añadido el patrocinio correctamente",
            data: newSponsor[0],
            info: infoSponsor
        });

    } catch (e){
        console.log(e)
        next(e);
    }
}

module.exports = addSponsor;