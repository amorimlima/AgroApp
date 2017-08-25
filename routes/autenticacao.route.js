const HttpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const { encode } = require('jwt-simple');

module.exports = (router, app) => {
  const UsuarioDAO = app.get('dao').UsuarioDAO;

  router.post('/cadastrar', (req, res) => {
    const usuarioDAO = new UsuarioDAO(app.get('models'));
    const payload = req.body;
    
    usuarioDAO
      .createNew(payload)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      })
      .catch(error => {
        res.status(error.statusCode);
        res.json(error.data);
      });
  });

  router.post('/', (req, res) => {
    app.get('models').Email
      .findOne({ where: { email: req.body.email } })
      .then(instance => app.get('models').Usuario.findById(instance.Usuario))
      .then(instance => {
        if (bcrypt.compareSync(req.body.senha, instance.senha)) {
          const payload = instance.get({ plain: true });
          
          res.status(HttpStatus.OK);
          res.json({ token: `JWT ${encode(payload, app.get('configs').jwt.secret)}` });
        }
        else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      })
      .catch(error => res.sendStatus(HttpStatus.UNAUTHORIZED));
  });

  return router;
};
