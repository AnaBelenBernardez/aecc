const { getPool } = require('../database/db');
const generateError = require('../helpers/generateError');

const bannerExists = async (req, res, next) => {
    let pool;

    try {
        const { idBanner } = req.params;
        pool = await getPool();

        const [banner] = await pool.query(
            `
                SELECT id
                FROM banners
                WHERE id=?
            `,
            [idBanner]
        );

        if (!banner.length) {
            return next(generateError('No se ha podido encontrar el banner', 404));
        }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = bannerExists;
