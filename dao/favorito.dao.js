const GenericDAO = require('./generic.dao');

class FavoritoDAO extends GenericDAO {
  constructor(models) {
    super(models.Favorito);
    this.models = models;
  }
}

module.exports = FavoritoDAO;
