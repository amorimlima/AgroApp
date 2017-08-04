const HttpStatus = require('http-status');

module.exports = (router, app) => {
  const UsuarioProdutoDAO = app.get('dao').UsuarioProdutoDAO;

  router
    .route('/')
    .post((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const token = req.get('Authorization').replace('JWT', '').trim();
        const Usuario = app.get('configs').jwt.decode(token, app.get('configs').jwt.secret);
        const oferta = Object.assign({}, req.body);

        oferta.Produto = oferta.Anuncio.id;
        oferta.Usuario = Usuario.id;

        usuarioProdutoDAO
          .createOrUpdate(oferta)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          })
          .catch(err => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    })

  router
    .route('/meus-produtos')
    .get((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const token = req.get('Authorization').replace('JWT', '').trim();
        const Usuario = app.get('configs').jwt.decode(token, app.get('configs').jwt.secret);

        usuarioProdutoDAO
          .getByUser(Usuario.id)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          })
          .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    });

  router
    .route('/:id')
    .delete((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const id = parseInt(req.params.id);

        usuarioProdutoDAO
          .delete(id)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          })
          .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    })

  return router;

};
