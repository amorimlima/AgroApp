const Base64 = require('Base64');
const HttpStatus = require('http-status');

const categoriaProdutoRoute = (router, app) => {
  const CategoriaProdutoDAO = app.get('dao').CategoriaProdutoDAO;
    
  router
    .route('/')
    .get((req, res) => {
      const categoriaProdutoDAO = new CategoriaProdutoDAO(app.get('models'));

      categoriaProdutoDAO
        .getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  router
    .route('/produtos')
    .get((req, res) => {
      const categoriaProdutoDAO = new CategoriaProdutoDAO(app.get('models'));

      categoriaProdutoDAO
        .getProdutos()
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(err => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    });

  return router;
};

module.exports = categoriaProdutoRoute;
