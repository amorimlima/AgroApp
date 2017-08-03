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

        oferta.Produto = oferta.Produto.id;
        oferta.Usuario = Usuario.id;

        usuarioProdutoDAO
          .create(oferta)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          })
          .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
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
    })

  return router;

};
