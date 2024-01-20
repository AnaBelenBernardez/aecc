const {getPool} = require('../../database/db');
const generateError = require('../../helpers/generateError')

        async function getNews (req,res,next) {

            const {idNews} = req.params;

            const pool = await getPool();



            try{
                const [news] = await pool.query(`
                    SELECT n.id, n.title, n.content, n.link
                    FROM news n
                    WHERE id = ?
                ` , [idNews]);

                if(!news.length){
                    return next(generateError('No se ha podido encontrar la noticia', 404));
                }
                res.status(200).send({
                    status: "OK",
                    data: news
                });
            } catch(e){
                console.log(e);
                next(e);
            }
        }

        module.exports = getNews;