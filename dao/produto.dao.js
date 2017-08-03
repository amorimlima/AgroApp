const GenericDAO = require('./generic.dao');

class ProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.Produto);
    this.models = models;
  }
}

module.exports = ProdutoDAO;
