const {getPool} = require('../../database/db');
const jwt = require('jsonwebtoken');
const generateError = require('../../helpers/generateError');
const adminLoginSchema = require('../../schemas/adminLoginSchema');

async function login (req,res,next) {
    try{
        const {name, pwd} = req.body;

        const { error } = adminLoginSchema.validate(req.body);
    if (error) {
        return next(generateError(error.message, 400));
    }
        const pool = await getPool();


        const [admin] = await pool.query(
            `
                SELECT id, admin_name
                FROM admins
                WHERE admin_name=? AND pwd=SHA2(?, 512)
            `,
            [name, pwd]
        );

        if(!admin.length){

            return res.status(404).send({
                status: 'No autorizado',
                message: 'Usuario y/o contraseña incorrecto/s'
            })
        }

        const info = {
            id: admin[0].id,
            name: admin[0].admin_name
        }

        const token = jwt.sign(info, process.env.SECRET, {expiresIn: '1d'});


        res.status(200).send({
            status: 'OK',
            message: 'Se ha iniciado la sesión correctamente',
            data: {
                token,
                info
            },
        });
    }catch(e){
        console.log(e);
    }
};

module.exports = login;