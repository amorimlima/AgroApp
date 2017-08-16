const GenericDAO = require('./generic.dao');
const responses = require('../utils/responses');

class CategoriaProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.CategoriaProduto);
    this.models = models;
  }

  getProdutos() {
    return this.model
      .findAll({ attributes: [ 'id', 'nome' ], include: [
        { model: this.models.Produto, as: 'Produtos', attributes: [ 'id', 'nome' ] }
      ]})
      .then(categorias => responses.generic(categorias))
      .catch(err => responses.error(err));
  }
}

module.exports = CategoriaProdutoDAO;
