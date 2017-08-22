const { decode } = require('jwt-simple');

module.exports = app => (req, res, next) => {
    "use strict";
    const TOKEN   = req.get('Authorization').replace('JWT', '').trim();
    const decoded = decode(TOKEN, app.get('configs').jwt.secret);
    decoded.token = TOKEN;

    req.session = decoded;

    next();
};
