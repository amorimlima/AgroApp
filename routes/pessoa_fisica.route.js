module.exports = (router, app) => {
  const PessoaFisicaDAO = app.get('dao').PessoaFisicaDAO;

  router
    .route('/:cpf')
    .get((req, res) => {
      const pfDAO = new PessoaFisicaDAO(app.get('models'));
      const cpf = req.params.cpf;

      pfDAO
        .getById(cpf)
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(err => res.sendStatus(err.statusCode));
    });
  
  return router;
};
