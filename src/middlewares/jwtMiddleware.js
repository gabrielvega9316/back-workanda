// middlewares/jwtMiddleware.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/jwtConfig');

function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization;
  console.log('token', token)
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Almacenar el ID de usuario en el objeto de solicitud para su uso posterior
    req.userId = decoded.userId;
    next();
  });
}

module.exports = jwtMiddleware;
