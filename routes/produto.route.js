const HttpStatus = require('http-status');

const produtoRoute = (router, app) => {
  const ProdutoDAO = app.get('dao').ProdutoDAO;
  const UsuarioProdutoDAO = app.get('dao').UsuarioProdutoDAO;

  router
    .route('/oferta')
    //.all(app.get('auth').authenticate())
    .post((req, res) => {
      const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));

      usuarioProdutoDAO
        .create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
  
  router
    .route('/')
    .get((req, res) => {
      const produtoDAO = new ProdutoDAO(app.get('models'));

      produtoDAO
        .getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })

  return router;
};

module.exports = produtoRoute;
