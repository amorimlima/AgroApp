const ms = require('ms');

module.exports = time => (req, res, next) => {
  let cache = `max-age: ${ms(time) / 1000}`;

  if (res.get('Cache-Control')) {
    cache = `${res.get('Cache-Control')}, ${cache}`;
  }

  res.set('Cache-Control', cache);
  next();
};
