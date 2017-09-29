const GenericDAO = require('./generic.dao');
const responses  = require('../utils/responses');

class UsuarioProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.UsuarioProduto);
    this.models = models;
  }

  getOferta(oferta) {
    return this.model
      .findOne({
        attributes: [ 'id', 'unidade', 'quantidade', 'data_inicio', 'data_fim' ],
        where: { id: oferta },
        include: [
          {
            model: this.models.Produto,
            as: 'Anuncio',
            attributes: [ 'id', 'Categoria', 'nome' ],
            required: true
          },
          {
            model: this.models.Usuario,
            as: 'Anunciante',
            attributes: [ 'id', 'tipo' ],
            required: true,
            include: [
              {
                model: this.models.Endereco,
                as: 'Enderecos',
                attributes: [ 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep' ],
                required: true
              },
              {
                model: this.models.Email,
                as: 'Emails',
                attributes: [ 'email' ],
                required: true
              },
              {
                model: this.models.Telefone,
                as: 'Telefones',
                attributes: [ 'ddd', 'numero' ],
                required: true
              },
              {
                model: this.models.PessoaFisica,
                as: 'PessoaFisica',
                attributes: [ 'cpf', 'nome', 'sobrenome' ]
              },
              {
                model: this.models.PessoaJuridica,
                as: 'PessoaJuridica',
                attributes: [ 'cnpj', 'razao_social', 'responsavel' ]
              }
            ]
          }
        ]
      })
      .then(instance => responses.generic(instance))
      .catch(error => Promise.reject(responses.error(error)));
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
        include: [ {
          model: this.models.Produto,
          attributes: [ 'id', 'nome', 'Categoria' ],
          as: 'Anuncio'
        }]
      })
      .then(produtos => responses.generic(produtos))
      .catch(error => responses.error(error));
  }

  listarParaBusca(Usuario, produto, estado = '', cidade = '') {
    if (!produto) produto = { $not: null };
    estado = { $like: `%${estado}%` };
    cidade = { $like: `%${cidade}%` };

    return this.model
      .findAll({
        attributes: [ 'id', 'unidade', 'quantidade', 'data_inicio', 'data_fim', 'ativo'  ],
        include: [
          {
            model: this.models.Produto,
            as: 'Anuncio',
            attributes: [ 'id', 'Categoria', 'nome' ],
            required: true,
            where: { id: produto }
          },
          {
            model: this.models.Usuario,
            as: 'Anunciante',
            attributes: [ 'id', 'tipo' ],
            required: true,
            where: { id: { $not: Usuario } },
            include: [
              {
                model: this.models.Endereco,
                as: 'Enderecos',
                attributes: [ 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'latitude', 'longitude' ],
                required: true,
                where: { cidade, estado }
              },
              {
                model: this.models.PessoaFisica,
                as: 'PessoaFisica',
                attributes: [ 'cpf', 'nome', 'sobrenome' ]
              },
              {
                model: this.models.PessoaJuridica,
                as: 'PessoaJuridica',
                attributes: [ 'cnpj', 'razao_social', 'responsavel' ]
              },
              {
                model: this.models.Telefone,
                as: 'Telefones',
                attributes: [ 'ddd', 'numero' ]
              },
              {
                model: this.models.Email,
                as: 'Emails',
                attributes: [ 'email' ]
              }
            ]
          }
        ]
      })
      .then(produtos => responses.generic(produtos))
      .catch(error => responses.error(error));
  }
}

module.exports = UsuarioProdutoDAO;
