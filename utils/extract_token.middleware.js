const { decode } = require('jwt-simple');

module.exports = app => (req, res, next) => {
    "use strict";
    const TOKEN = req.get('Authorization');
    if (!TOKEN) return next();
    req.session = decode(TOKEN.replace('JWT', '').trim(), app.get('configs').jwt.secret);
    next();
};
