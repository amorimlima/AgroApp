const GenericDAO = require('./generic.dao');
const responses = require('../utils').responses;

const HttpStatus = require('http-status');

class EmailDAO extends GenericDAO {
  constructor(models) {
    super(models.Email);
    this.Usuario = models.Usuario;
    this.Credencial = models.Credencial;
    this.Perfil = models.Perfil;
  }

  getByEndereco(endereco) {
    return this.model
      .findOne({ where: { email: endereco } })
      .then(instance => responses.generic(instance))
      .catch(error => responses.error(error));
  }

  getCredenciais(dadosLogin) {
    let emailInstance = null;
    let usuarioInstance = null;
    let credencialInstance = null;
    let payload = {};

    return this.model
      .findOne({ where: { email: dadosLogin.email }})
      .then((instance) => {
        payload = Object.assign({}, instance.get({ plain: true }));

        return this.Usuario.findOne({ where: { id: payload.usuario } });
      })
      .then((instance) => {
        payload.usuario = Object.assign({}, instance.get({ plain: true }));

        return this.Credencial.findOne({ where: { email: payload.id } });
      })
      .then((instance) => {
        payload.credencial = Object.assign({}, instance.get({ plain: true }));


        return this.Perfil.findOne({ where: { id: payload.credencial.perfil } });
      })
      .then((instance) => {
        payload.perfil = Object.assign({}, instance.get({ plain: true }));

        return Promise.resolve(responses.generic(payload));
      })
      .catch((error) => responses.error('Erro ao retornar o registro.', HttpStatus.UNAUTHORIZED));
  }
}

module.exports = EmailDAO;
