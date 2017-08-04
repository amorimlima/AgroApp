const GenericDAO = require('./generic.dao');

const responses = require('../utils/responses');

class UsuarioProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.UsuarioProduto);
    this.models = models;
  }

  createOrUpdate(usuarioProduto) {
    if (usuarioProduto.id) {
      return this.model
        .update(usuarioProduto, { where: { id: usuarioProduto.id } })
        .then(row => responses.generic(row))
        .catch(err => responses.error(err));
    }
    else {
      return this.model
        .create(usuarioProduto)
        .then(instance => responses.generic(instance))
        .catch(err => responses.error(err));
    }
  }

  getByUser(id) {
    return this.model
      .findAll({
        attributes: [ 'id', 'unidade', 'quantidade', 'data_inicio', 'data_fim', 'Usuario' ],
        where: { Usuario: id },
        include: [ { model: this.models.Produto, as: 'Anuncio' } ]
      })
      .then(produtos => responses.generic(produtos))
      .catch(error => responses.error(error));
  }
}

module.exports = UsuarioProdutoDAO;
