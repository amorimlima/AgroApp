const GenericDAO = require('./generic.dao');

class EnderecoDAO extends GenericDAO {
  constructor(Endereco) {
    super(Endereco);
  }
}

module.exports = EnderecoDAO;
