const GenericDAO = require('./generic.dao');

class CategoriaProdutoDAO extends GenericDAO {
  constructor(CategoriaProduto) {
    super(CategoriaProduto);
  }
}

module.exports = CategoriaProdutoDAO;
