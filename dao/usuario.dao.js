var GenericDAO = require('./generic.dao');

const responses = require('../utils').responses;
class UsuarioDAO extends GenericDAO {
  constructor(models) {
    super(models.Usuario);
    this.models = models;
  }

  getCreated(id) {
    return this.model
      .findOne({
        where: { id },
        include: [
          { model: this.models.PessoaFisica, as: 'pessoa_fisica' },
          { model: this.models.PessoaJuridica, as: 'pessoa_juridica' },
          { model: this.models.Credencial, as: 'credencial', include: [
            { model: this.models.Email },
            { model: this.models.Perfil }
          ] },
          { model: this.models.Endereco, as: 'enderecos' },
          { model: this.models.Telefone, as: 'telefones', include: [
            { model: this.models.TipoTelefone, as: 'tipo' },
          ] }
        ]
      })
      .then(instance => responses.generic(instance))
      .catch(error => {
        console.log(error)
        return responses.error(error)
      });
  }
};

module.exports = UsuarioDAO;
