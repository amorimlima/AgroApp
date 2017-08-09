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

  listarParaBusca(produto = { $not: null }, estado, cidade) {
    if (estado)
      estado = { $like: `%${estado}%` };
    else
      estado = { $not: null };

    if (cidade)
      cidade = { $like: `%${cidade}%` };
    else
      cidade = { $not: null };

    return this.model
      .findAll({
        include: [
          { model: this.models.Produto, as: 'Anuncio', required: true, where: { id: produto } },
          { model: this.models.Usuario, as: 'Anunciante', required: true, include: [
            { model: this.models.Endereco, as: 'Enderecos', required: true, where: { cidade, estado } },
            { model: this.models.PessoaFisica, as: 'PessoaFisica' },
            { model: this.models.PessoaJuridica, as: 'PessoaJuridica' }
          ]}
        ]
      })
      .then(produtos => responses.generic(produtos))
      .catch(error => responses.error(error));
  }
}

module.exports = UsuarioProdutoDAO;
