const HttpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const autenticacaoRoute = (router, app) => {
  const UsuarioDAO = app.get('dao').UsuarioDAO;

  router.post('/cadastrar', (req, res) => {
    const usuarioDAO = new UsuarioDAO(app.get('models'));
    const payload = req.body;
    
    usuarioDAO
      .createNew(payload)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      })
      .catch((error) => {
        res.status(error.statusCode);
        res.json(error.data);
      });
  });

  router.post('/', (req, res) => {
    app.get('models').Email
      .findOne({ where: { email: req.body.email } })
      .then(instance => {
        if (!instance)
          res.sendStatus(HttpStatus.NOT_FOUND);
        else
          return app.get('models').Usuario.findById(instance.Usuario)
      })
      .then(instance => {
        if (bcrypt.compareSync(req.body.senha, instance.senha)) {
          const payload = instance.get({ plain: true });
          
          res.status(HttpStatus.OK);
          res.json({ token: `JWT ${jwt.encode(payload, app.get('configs').jwt.secret)}` });
        }
        else {
          res.sendStatus(HttpStatus.NOT_FOUND);
        }
      })
      .catch(error => {
        res.sendStatus(HttpStatus.NOT_FOUND);
      });
      
  });

  return router;
}

module.exports = autenticacaoRoute;
