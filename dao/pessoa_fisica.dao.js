const GenericDAO = require('./generic.dao');

class PessoaFisicaDAO extends GenericDAO {
  constructor(PessoaFisica) {
    super(PessoaFisica);
  }
}

module.exports = PessoaFisicaDAO;
