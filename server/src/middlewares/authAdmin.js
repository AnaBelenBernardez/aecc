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
      throw generateError('Token incorrecto', 401);
    }

    req.admin = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authAdmin;