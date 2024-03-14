const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError');




        async function getAllNews (req,res,next) {

            const pool = await getPool();
            try {

                const [news] = await pool.query(`SELECT n.id, n.title, n.galician_title, n.create_date, n.news_date, n.link, np.photo, np.photo_date
                FROM news n
                LEFT JOIN news_photos np ON n.id = np.news_id;`
                );

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