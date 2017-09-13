module.exports = (router, app) => {
  const ProdutoDAO = app.get('dao').ProdutoDAO;
  const UsuarioProdutoDAO = app.get('dao').UsuarioProdutoDAO;

  router
    .route('/oferta')
    .post((req, res) => {
      const usuarioProdutoDAO = new UsuarioProdutoDAO(app.get('models'));

      usuarioProdutoDAO
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.sendStatus(err.satusCode));
    });
  
  router
    .route('/')
    .get((req, res) => {
      const produtoDAO = new ProdutoDAO(app.get('models'));

      produtoDAO
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => res.sendStatus(err.satusCode));
    })

  return router;
};
