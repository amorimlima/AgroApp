import HttpStatus from 'http-status'
import jwt from 'jwt-simple'

module.exports = (router, app) => {
  const UsuarioProdutoDAO = app.get('dao').UsuarioProdutoDAO;

  router
    .route('/')
    .post((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const token = req.get('Authorization').replace('JWT', '').trim();
        const Usuario = jwt.decode(token, app.get('configs').jwt.secret);
        const oferta = Object.assign({}, req.body);

        oferta.Produto = oferta.Anuncio.id;
        oferta.Usuario = Usuario.id;

        usuarioProdutoDAO
          .createOrUpdate(oferta)
          .then(response => res.status(response.statusCode).json(response.data))
          .catch(err => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        console.log(e);
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    });

  router
    .route('/meus-produtos')
    .get((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const token = req.get('Authorization').replace('JWT', '').trim();
        const Usuario = jwt.decode(token, app.get('configs').jwt.secret);

        usuarioProdutoDAO
          .getByUser(Usuario.id)
          .then(response => res.status(response.statusCode).json(response.data))
          .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        console.log()
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    });

  router
    .route('/por-usuario/:id')
    .get((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const Usuario = req.params.id;

        usuarioProdutoDAO
          .getByUser(Usuario)
          .then(response => res.status(response.statusCode).json(response.data))
          .catch(error => res.sendStatus(error.statusCode));
      }
      catch (e) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
      }
    })
    
  router
    .route('/busca')
    .get((req, res) => {
      const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
      const Usuario = req.session.id;
      const { produto, cidade, estado } = req.query;

      usuarioProdutoDAO
        .listarParaBusca(Usuario, produto, estado, cidade)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(error => res.sendStatus(error.statusCode));
    });

  router
    .route('/:id')
    .get((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const id = parseInt(req.params.id);

        usuarioProdutoDAO
          .getOferta(id)
          .then(response => res.status(response.statusCode).json(response.data))
          .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
      }
    })
    .delete((req, res) => {
      try {
        const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));
        const id = parseInt(req.params.id);

        usuarioProdutoDAO
          .delete(id)
          .then(response => res.status(response.statusCode).json(response.data))
          .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
      }
      catch (e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    });

  return router;
};
