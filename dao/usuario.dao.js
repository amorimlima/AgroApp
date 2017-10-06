'use strict'

const GenericDAO = require('./generic.dao');
const responses = require('../utils').responses;

class UsuarioDAO extends GenericDAO {
  constructor(models) {
    super(models.Usuario);
    this.models = models;
  }

  createNew(payload) {
    return this.model
      .create(payload, {
        include: [
          { model: this.models.PessoaFisica, as: 'PessoaFisica' },
          { model: this.models.PessoaJuridica, as: 'PessoaJuridica' },
          { model: this.models.Email, as: 'Emails' },
          { model: this.models.Endereco, as: 'Enderecos' },
          { model: this.models.Telefone, as: 'Telefones' }
        ]
      })
      .then(response => responses.generic(response));
  }

  getCreated(id) {
    return this.model
      .findOne({
        attributes: [ 'id', 'tipo', 'Perfil' ],
        where: { id },
        include: [
          {
            model: this.models.PessoaFisica,
            attributes: [ 'cpf', 'rg', 'nome', 'sobrenome', 'data_nascimento' ],
            as: 'PessoaFisica'
          },
          {
            model: this.models.PessoaJuridica,
            attributes: [ 'cnpj', 'razao_social', 'responsavel', 'data_fundacao' ],
            as: 'PessoaJuridica'
          },
          {
            model: this.models.Email,
            attributes: [ 'email' ],
            as: 'Emails'
          },
          { 
            model: this.models.Endereco,
            attributes: [ 'logradouro', 'numero', 'complemento', 'cep', 'bairro', 'cidade', 'estado', 'latitude', 'longitude'],
            as: 'Enderecos'
          },
          {
            model: this.models.Telefone,
            attributes: [ 'ddd', 'numero', 'Tipo' ],
            as: 'Telefones'
          }
        ]
      })
      .then(instance => responses.generic(instance))
      .catch(error => responses.error(error));
  }

  getPessoaDe(usuario) {
    return this.model
      .findOne({
        attributes: [ 'id', 'tipo' ],
        where: { id: usuario },
        include: [
          {
            model: this.models.PessoaFisica,
            attributes: [ 'cpf', 'rg', 'nome', 'sobrenome', 'data_nascimento' ],
            as: 'PessoaFisica'
          },
          {
            model: this.models.PessoaJuridica,
            attributes: [ 'cnpj', 'razao_social', 'responsavel', 'data_fundacao' ],
            as: 'PessoaJuridica'
          }
        ]
      })
      .then(instance => responses.generic(instance))
  }
}

module.exports = UsuarioDAO;
