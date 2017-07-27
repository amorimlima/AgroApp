const GenericDAO = require('./generic.dao');

class TelefoneDAO extends GenericDAO {
  constructor(models) {
    super(models.Telefone);
  }
}

module.exports = TelefoneDAO;
