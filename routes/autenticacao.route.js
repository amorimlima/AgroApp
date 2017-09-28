const axios = require('axios');
const HttpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const { encode } = require('jwt-simple');
const enderecoHelper = require('../helpers').endereco;

const getCoordenadasDe = Endereco => {
  const API_KEY = process.env.API_KEY;
  const encoded = enderecoHelper.getEnderecoCompleto(Endereco, true);
  const geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${API_KEY}`;
  
  return axios
    .get(geocode)
    .then(response => ({ 
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng
    }))
}

module.exports = (router, app) => {
  const UsuarioDAO = app.get('dao').UsuarioDAO;

  router.post('/cadastrar', (req, res) => {
    try {
      const usuarioDAO = new UsuarioDAO(app.get('models'));
      const payload = req.body;
      
      getCoordenadasDe(payload.Enderecos[0])
        .then(coordenadas => Object.assign(payload.Enderecos[0], coordenadas))
        .then(() => usuarioDAO.createNew(payload))
        .then(response => res.status(HttpStatus.CREATED).json(response.data))
        .catch(error => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY))
    }
    catch (err) {
      res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
    }
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
