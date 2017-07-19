const Base64 = require('Base64');

const categoriaProdutoRoute = (router, app) => {
  const CategoriaProdutoDAO = app.get('dao').CategoriaProdutoDAO;

  router.get('/', (req, res) => {
    const categoriaProdutoDAO = new CategoriaProdutoDAO(app.get('models').CategoriaProduto);

    categoriaProdutoDAO
      .getAll()
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  return router;
};

module.exports = categoriaProdutoRoute;
