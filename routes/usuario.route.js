const usuarioRoute = (router, app) => {
  const Email      = app.get('models').Email;
  const Usuario    = app.get('models').Usuario;
  const Credencial = app.get('models').Credencial;

  const EmailDAO      = app.get('dao').EmailDAO;
  const UsuarioDAO    = app.get('dao').UsuarioDAO;
  const CredencialDAO = app.get('dao').CredencialDAO;

  router.post('/', (req, res) => {
    const emailDAO = new EmailDAO(Email);
    const usuarioDAO = new UsuarioDAO(Usuario);
    const credencialDAO = new CredencialDAO(Credencial);

    const payload = req.body;
    
    let response = {};
    let idUsuario = null;
    let tipoPessoa = null;

    usuarioDAO
      .create(payload.usuario)
      .then((usuario) => {
        const emailPayload = Object.create(payload.email);

        response = Object.create(usuario.data);
        emailPayload.usuario = idUsuario;
        idUsuario = usuario.data.id;
        tipoPessoa = usuario.data.tipo;
        
        emailDAO
          .create(emailPayload)
          .then((email) => {
            const credencialPayload = Object.create(payload.endereco);

            credencialPayload.usuario = idUsuario;
            credencialPayload.email = email.data.id;
            response.email = Object.create(email.data);

            credencialDAO
              .create(credencialPayload)
              .then((credencial) => {
                response.credencial = Object.create(credencial.data);

                res.statusCode = credencial.statusCode;
                res.json(response);
              });
          });
      });
  });

  return router;
};

module.exports = usuarioRoute;
