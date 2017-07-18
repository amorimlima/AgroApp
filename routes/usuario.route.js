const usuarioRoute = (router, app) => {
  const EmailDAO = app.get('dao').EmailDAO;
  const UsuarioDAO = app.get('dao').UsuarioDAO;
  const CredencialDAO = app.get('dao').CredencialDAO;

  router.post('/register', (req, res) => {
    const emailDAO      = new EmailDAO(app.get('models').Email);
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

  return router;
};

module.exports = usuarioRoute;
