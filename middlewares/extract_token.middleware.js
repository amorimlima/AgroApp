const { decode } = require('jwt-simple');

module.exports = app => (req, res, next) => {
  const TOKEN = req.get('Authorization') || req.query.token || false;

  if (!TOKEN) {
    return next();
  }
  
  req.session = decode(TOKEN.replace('JWT', '').trim(), app.get('configs').jwt.secret);
  next();
};
