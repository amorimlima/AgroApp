module.exports = () => (req, res, next) => {
  let cache = 'no-cache';

  if (res.get('Cache-Control')) {
    cache = `${res.get('Cache-Control')}, ${cache}`;
  }

  res.set('Cache-Control', cache);
  next();
};
