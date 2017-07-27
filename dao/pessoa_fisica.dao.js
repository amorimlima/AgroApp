const GenericDAO = require('./generic.dao');

class PessoaFisicaDAO extends GenericDAO {
  constructor(models) {
    super(models.PessoaFisica);
  }
}

module.exports = PessoaFisicaDAO;
