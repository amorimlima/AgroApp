const HttpStatus = require('http-status');

const testRoute = (router, app) => {
  const UsuarioDAO = app.get('dao').UsuarioDAO;

  router.get('/porCredencial/:id', (req, res) => {
    const usuarioDAO = new UsuarioDAO(app.get('models'));

    usuarioDAO
      .getCreated(req.params.id)
      .then(response => {
        res.json(response.data)
      });
  });

  return router;
};

module.exports = testRoute;
