const GenericDAO = require('./generic.dao');

class PessoaJuridicaDAO extends GenericDAO {
  constructor(models) {
    super(models.PessoaJuridica);
  }
}

module.exports = PessoaJuridicaDAO;
