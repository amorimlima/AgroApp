var GenericDAO = require('./generic.dao');

class PessoaDAO extends GenericDAO {
  constructor(model) {
    super(model);
  }
};

module.exports = PessoaDAO;
