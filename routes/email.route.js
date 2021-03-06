const HttpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

module.exports = (router, app) => {
  const EmailDAO = app.get('dao').EmailDAO;

  router.get('/:endereco', (req, res) => {
    const emailDAO = new EmailDAO(app.get('models'));

    emailDAO
      .getByEndereco(req.params.endereco)
      .then(response => res.json(response.data))
      .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
  });

  router.post('/autenticacao', (req, res) => {
    const emailDAO = new EmailDAO(app.get('models'));
    const dadosLogin = req.body;
    
    emailDAO
      .getCredenciais(dadosLogin)
      .then((resp) => {
        if (resp.statusCode == HttpStatus.UNAUTHORIZED) {
          res.sendStatus(resp.statusCode);
        }
        else if (bcrypt.compareSync(dadosLogin.senha, resp.data.credencial.senha)) {
          const token = jwt.encode({
            usuario: resp.data.usuario.id,
            tipo: resp.data.usuario.tipo,
            perfil: resp.data.perfil.id
          }, app.get('configs').jwt.secret);
          
          res.status(HttpStatus.OK);
          res.json({ token });
        }
        else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      });
  });

  return router;
};
