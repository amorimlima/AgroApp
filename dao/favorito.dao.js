const GenericDAO = require('./generic.dao');
const responses = require('../utils/responses');

class FavoritoDAO extends GenericDAO {
  constructor(models) {
    super(models.Favorito);
    this.models = models;
  }

  getFavorito(Usuario, Favorito) {
    return this.model
      .findOne({ where: { Usuario, Favorito } })
      .then(instance => responses.generic(instance))
      .catch(error => responses.error(error));
  }
}

module.exports = FavoritoDAO;
