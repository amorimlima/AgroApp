module.exports = (router, app) => {
  const { FavoritoDAO } = app.get('dao');

  router
    .route('/')
    .post((req, res) => {
      const favoritoDAO = new FavoritoDAO(app.get('models'));
      const Usuario  = req.session.id;
      const Favorito = req.body.favorito;
      const payload  = { Usuario, Favorito };

      console.log(payload);

      favoritoDAO
        .create(payload)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(error => res.sendStatus(error.statusCode));
    });

  router
    .route('/:id')
    .get((req, res) => {
      const favoritoDAO = new FavoritoDAO(app.get('models'));
      const Usuario  = req.session.id;
      const Favorito = req.params.id;
      const payload  = { Usuario, Favorito };

      console.log(payload)

      favoritoDAO
        .getFavorito(Usuario, Favorito)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(error => res.sendStatus(error.statusCode));
    })
    .delete((req, res) => {
      const favoritoDAO = new FavoritoDAO(app.get('models'));
      const Usuario = req.session.id;
      const Favorito = req.params.id;
      const payload = { Usuario, Favorito };

      favoritoDAO
        .removeFavorito(Usuario, Favorito)
        .then(response => res.sendStatus(response.statusCode))
        .catch(error => res.sendStatus(error.statusCode));
    });

  return router;
};
