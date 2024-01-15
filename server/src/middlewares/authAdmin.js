const jwt = require('jsonwebtoken');
const generateError = require('../helpers/generateError');

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return next(generateError('Acceso limitado a administradores', 401));
    }

    let tokenInfo;

    try {
      tokenInfo = await jwt.verify(token, process.env.SECRET);
    } catch {
      return next(generateError('Token incorrecto', 401));
    }

    /* const [admin] = await connect.query(
      `
          SELECT last_auth_update
          FROM admins
          WHERE id=?
      `,
      [tokenInfo.id]
  );

  const lastAuthUpdate = new Date(admin[0].last_auth_update);
  const timeStampCreateToken = new Date(tokenInfo.iat * 1000);

  if(timeStampCreateToken < lastAuthUpdate){
    return next(generateError('La sesión ha expirado. Debe volver a identificarse.', 401));
  } */

    req.admin = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authAdmin;