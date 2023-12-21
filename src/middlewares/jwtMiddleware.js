const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/jwtConfig');

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: err });
      }
      req.userId = decoded.userId;
      next();
    });
  
  } else {
    return res.status(401).json({ error: 'Token not provided' });
  }

}

module.exports = jwtMiddleware;
