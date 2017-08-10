module.exports = (router, app) => {
  const PessoaJuridicaDAO = app.get('dao').PessoaJuridicaDAO;

  router
    .route('/:cnpj')
    .get((req, res) => {
      const cnpj = req.params.cnpj;
      const pjDAO = new PessoaJuridicaDAO(app.get('models'));

      pjDAO
        .getById(cnpj)
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(err => res.sendStatus(err.statusCode));
    });

  return router;
};
