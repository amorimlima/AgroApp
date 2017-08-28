const HttpStatus = require('http-status');
const GenericDAO = require('./generic.dao');
const responses  = require('../utils/responses');

class FavoritoDAO extends GenericDAO {
  constructor(models) {
    super(models.Favorito);
    this.models = models;
  }
  
  getFavoritosDe(Usuario) {
    return this.model
      .findAll({ 
        attributes: [ 'Usuario' ],
        where: { Usuario },
        include: [
          { 
            model: this.models.Usuario,
            attributes: [ 'id', 'tipo' ],
            as: 'Favoritado',
            include: [
              { model: this.models.PessoaJuridica, as: 'PessoaJuridica' },
              { model: this.models.PessoaFisica, as: 'PessoaFisica' },
              { model: this.models.Endereco, as: 'Enderecos' }
            ],
            required: true
          }
        ]
      })
      .then(instance => responses.generic(instance))
      .catch(error => responses.error(error));
  }

  getFavorito(Usuario, Favorito) {
    return this.model
      .findOne({ where: { Usuario, Favorito } })
      .then(instance => responses.generic(instance))
      .catch(error => responses.error(error));
  }

  removeFavorito(Usuario, Favorito) {
    return this.model
      .destroy({ where: { Usuario, Favorito } })
      .then(rows => responses.generic(rows, HttpStatus.NO_CONTENT))
      .catch(error => responses.error(error));
  }
}

module.exports = FavoritoDAO;
