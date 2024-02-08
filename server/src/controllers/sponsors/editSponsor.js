const {getPool} = require("../../database/db");

const generateError = require('../../helpers/generateError');
const sponsorSchema = require('../../schemas/sponsorSchema');
const { photoSchema } = require('../../schemas/photoSchema');
const savePhoto = require('../../helpers/savePhoto');
const deletePhoto = require('../../helpers/deletePhoto');

async function editSponsor (req,res,next) {

    try{
        const {idSponsor} = req.params;
        const pool = await getPool();

        const logo = req.files?.logo;

        if(req.files){
            if(req.files.length > 1){
                return next(generateError('Sólo es posible anexar un logo por patrocinio', 400));
            }
    
            await photoSchema.validateAsync(logo);
        }
        
        const {error} = sponsorSchema.validate(req.body);

        if(error){
            return next(generateError(error.message, 400));
        }

        const { name, galician_name, description, galician_description, link, important } = req.body;

        const [duplicateSponsor] = await pool.query(
            `
                SELECT *
                FROM sponsors
                WHERE name = ?
            `, [name]
        );

        if(duplicateSponsor.length && duplicateSponsor[0].id !== parseInt(idSponsor)){
            return next(generateError('Ya existe ese patrocinador en la web, edítalo o elimínalo para evitar contenidos duplicados', 400));
        }
        
        if(logo){
            const logoName = await savePhoto(logo, 500);
            await pool.query(
                `
                    UPDATE sponsors 
                    SET logo = ?
                    WHERE id = ?
                `,
                [logoName, idSponsor]
            );

            deletePhoto(duplicateSponsor[0].logo);
        }

        const [editedSponsor] = await pool.query(
            `
                UPDATE sponsors
                SET  name = ?, galician_name = ?, description = ?, galician_description = ?, link = ?, important = ?
                WHERE id = ?
            `,
            [name, galician_name, description, galician_description, link, important, idSponsor]
        );

        const [updatedSponsor] = await pool.query(
            `
                SELECT *
                FROM sponsors
                WHERE id = ?
            `,
            [idSponsor]

        );

        res.status(200).send({
            status: "OK",
            data: updatedSponsor,
            infoEdited: editedSponsor
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = editSponsor;