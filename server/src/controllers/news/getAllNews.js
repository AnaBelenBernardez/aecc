const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');




        async function getAllNews (req,res,next) {

            const pool = await getPool();
            try {

            let [news] = await pool.query
            (
                `
                SELECT *
                FROM news
                `
            )

            if (!news.length) {
                return next(generateError('No hay noticias para mostrar', 404));
            }

            res.status(200).send({
                status: 'OK',
                data: news
            })

        } catch (e) {
            console.log(e);
            next(e);
        }

    }
    
    module.exports = getAllNews