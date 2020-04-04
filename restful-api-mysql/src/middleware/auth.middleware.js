const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

module.exports = function(req, res, next) {
  const token = req.headers['auth-token'];

  if (!token) {
    // stop user auth validation
    res.status(401).send({ auth: false, msg: 'Access Denied' });
  }

  try {
    // return the user's id when creating the token
    const verified = jwt.verify(token, jwtconfig.secret); // { id: '1', iat: 'vn39u4g'}
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ msg: 'Invalid Token' });
  }
};
