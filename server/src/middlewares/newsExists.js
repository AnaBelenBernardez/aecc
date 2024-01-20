const {getPool} = require('../database/db');
const generateError = require('../helpers/generateError');

const newsExists = async (req,res,next) => {
    let pool;

    try {
        const {idNews} = req.params;
        pool = await getPool();

        const [news] = await pool.query(
          
            `
                SELECT id
                FROM news
                WHERE id=?
            `,
            [idNews]
        )

        if(!news.length){
            return next(generateError('No se ha podido encontrar la noticia', 404));
        }

        next();
    }

    catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = newsExists