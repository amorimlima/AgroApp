const GenericDAO = require('./generic.dao');

class EnderecoDAO extends GenericDAO {
  constructor(models) {
    super(models.Endereco);
  }
}

module.exports = EnderecoDAO;
