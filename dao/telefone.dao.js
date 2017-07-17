const GenericDAO = require('./generic.dao');

class TelefoneDAO extends GenericDAO {
  constructor(Telefone) {
    super(Telefone);
  }
}

module.exports = TelefoneDAO;
