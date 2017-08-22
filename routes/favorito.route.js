const { decode } = require('jwt-simple');

module.exports = (router, app) => {
  const { FavoritoDAO } = app.get('dao');

  router
    .route('/')
    .post((req, res) => {
      const favoritoDAO = new FavoritoDAO(app.get('models'));
      const token = req.get('Authorization').replace('JWT ', '');
      const auth = decode(token, app.get('configs').jwt.secret);

    });

  return router;
};
