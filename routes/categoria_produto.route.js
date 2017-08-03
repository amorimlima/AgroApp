const Base64 = require('Base64');

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
    })
    .post((req, res) => {
      const categoriaProdutoDAO = new CategoriaProdutoDAO(app.get('models'));
    })

  return router;
};

module.exports = categoriaProdutoRoute;
