const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');

async function changePwd (req,res, next){
    try{
        const pool = await getPool();

        const {idAdmin} = req.params;
        const {oldPwd, newPwd} = req.body;

        const idCurrentAdmin = req.admin.id;

        if(parseInt(idAdmin) !== idCurrentAdmin){
            return next(generateError('No estás autorizado para realizar este cambio de contraseña', 401));
        }

        if(!oldPwd || !newPwd){
            return next(generateError('Es necesario introducir la contraseña actual y la nueva contraseña', 400));
        }

        const [admin] = await pool.query(
            `SELECT id FROM admins WHERE id=? AND pwd=SHA2(?,512)`, [idAdmin, oldPwd]
        );

        if(!admin.length || admin.length === 0){
            return next(generateError('La contraseña es incorrecta. Debe introducir su contraseña actual para poder realizar este cambio', 401));
        }

        await pool.query(
            `UPDATE admins SET pwd=SHA2(?,512) WHERE id=?`,[newPwd, idAdmin]
        );
        
        res.status(200).send({
            status: 'OK',
            message: 'Contraseña actualizada correctamente'
        });

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports=changePwd;