const usuarioRoute = (router, app) => {
  const EmailDAO = app.get('dao').EmailDAO;
  const UsuarioDAO = app.get('dao').UsuarioDAO;
  const CredencialDAO = app.get('dao').CredencialDAO;
  const PessoaFisicaDAO = app.get('dao').PessoaFisicaDAO;
  const PessoaJuridicaDAO = app.get('dao').PessoaJuridicaDAO;
  const TelefoneDAO = app.get('dao').TelefoneDAO;

  router.post('/registro/credencial', (req, res) => {
    const emailDAO      = new EmailDAO(app.get('models'));
    const usuarioDAO    = new UsuarioDAO(app.get('models').Usuario);
    const credencialDAO = new CredencialDAO(app.get('models').Credencial);
    
    let statusCode = null;
    let response = {};

    usuarioDAO
      .create(req.body.usuario)
      .then((usuario) => {
        const emailPayload = Object.assign({}, req.body.email);
        
        response = Object.assign({}, usuario.data.get({ plain: true }));
        statusCode = usuario.statusCode;
        emailPayload.usuario = response.id;

        emailDAO
          .create(emailPayload)
          .then((email) => {
            const credencialPayload = Object.assign({}, req.body.credencial);

            response.email = Object.assign({}, email.data.get({ plain: true }));
            statusCode = email.statusCode;
            credencialPayload.usuario = response.id;
            credencialPayload.email = response.email.id;

            credencialDAO
              .create(credencialPayload)
              .then((credencial) => {
                response.credencial = Object.assign({}, credencial.data.get({ plain: true }));
                statusCode = credencial.statusCode;

                res.status(statusCode);
                res.json(response);
              });
          });
      });
  });

  router.post('/registro/dados-pessoais', (req, res) => {
    const pessoaFisicaDAO = new PessoaFisicaDAO(app.get('models').PessoaFisica);
    const pessoaJuridicaDAO = new PessoaJuridicaDAO(app.get('models').PessoaJuridica);
    const telefoneDAO = new TelefoneDAO(app.get('models').Telefone);
    
    let response = {};

    telefoneDAO
      .create(req.body.telefone)
      .then((telefone) => {
        response.telefone = Object.assign({}, telefone.data.get({ plain: true }));

        if (req.body.usuario.tipo === 'PF') {
          pessoaFisicaDAO
            .create(req.body.pessoa_fisica)
            .then((pf) => {
              response.pessoa_fisica = Object.assign({}, pf.data.get({ plain: true }));
              
              res.status(pf.statusCode);
              res.json(response);
            });
        }
        else {
          pessoaJuridicaDAO
            .create(req.body.pessoa_juridica)
            .then((pj) => {
              response.pessoa_juridica = Object.assign({}, pj.data.get({ plain: true }));

              res.status(pj.statusCode);
              res.json(response);
            });
        }
      });
  });

  return router;
};

module.exports = usuarioRoute;
