const GenericDAO = require('./generic.dao');

class PessoaJuridicaDAO extends GenericDAO {
  constructor(PessoaJuridica) {
    super(PessoaJuridica);
  }
}

module.exports = PessoaJuridicaDAO;
