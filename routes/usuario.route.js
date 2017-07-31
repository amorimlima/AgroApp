const usuarioRoute = (router, app) => {
  const PessoaFisicaDAO   = app.get('dao').PessoaFisicaDAO;
  const PessoaJuridicaDAO = app.get('dao').PessoaJuridicaDAO;
  const EmailDAO      = app.get('dao').EmailDAO;
  const UsuarioDAO    = app.get('dao').UsuarioDAO;
  const CredencialDAO = app.get('dao').CredencialDAO;
  const EnderecoDAO   = app.get('dao').EnderecoDAO;
  const TelefoneDAO   = app.get('dao').TelefoneDAO;

  router
    .route('/novo')
    .post((req, res) => {
      const pessoaFisicaDAO   = new PessoaFisicaDAO(app.get('models'));
      const pessoaJuridicaDAO = new PessoaJuridicaDAO(app.get('models'));
      const usuarioDAO    = new UsuarioDAO(app.get('models'));
      const emailDAO      = new EmailDAO(app.get('models'));
      const credencialDAO = new CredencialDAO(app.get('models'));
      const enderecoDAO   = new EnderecoDAO(app.get('models'));
      const telefoneDAO   = new TelefoneDAO(app.get('models'));
      const created = {};
      let payload = {};

      usuarioDAO.create(req.body.usuario)
      .then((response) => {
        created.usuario = response.data.get({ plain: true });

        if (created.usuario.tipo === 'PF') {
          payload = Object.assign({}, req.body.pessoa_fisica);
          payload.usuario = created.usuario.id;
          return pessoaFisicaDAO.create(payload);
        }
        else {
          payload = Object.assign({}, req.body.pessoa_juridica);
          payload.usuario = created.usuario.id;
          return pessoaJuridicaDAO.create(payload);
        }
      })
      .then((response) => {
        created.pessoa = response.data.get({ plain: true });
        payload = Object.assign({}, req.body.email);
        payload.usuario = created.usuario.id;
        return emailDAO.create(payload);
      })
      .then((response) => {
        created.email = response.data.get({ plain: true });
        payload = Object.assign({}, req.body.credencial);
        payload.usuario = created.usuario.id;
        payload.email = created.email.id;
        return credencialDAO.create(payload);
      })
      .then((response) => {
        created.credencial = response.data.get({ plain: true });
        payload = Object.assign({}, req.body.endereco);
        payload.usuario = created.usuario.id;
        return enderecoDAO.create(payload);
      })
      .then((response) => {
        created.endereco = response.data.get({ plain: true });
        payload = Object.assign({}, req.body.telefone);
        payload.usuario = created.usuario.id;
        return telefoneDAO.create(payload);
      })
      .then((response) => {
        created.telefone = response.data.get({ plain: true });

        res.status(response.statusCode);
        res.json(created);
      })
      .catch(error => res.sendStatus(error.statusCode));
    });

  return router;
};

module.exports = usuarioRoute;
