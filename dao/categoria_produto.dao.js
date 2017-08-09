const GenericDAO = require('./generic.dao');

class CategoriaProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.CategoriaProduto);
  }
}

module.exports = CategoriaProdutoDAO;
