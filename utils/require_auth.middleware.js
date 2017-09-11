const { UNAUTHORIZED } = require('http-status'); 

module.exports = () => (req, res, next) => {
  if (!req.session) {
    return res.sendStatus(UNAUTHORIZED);
  }
  next();
};