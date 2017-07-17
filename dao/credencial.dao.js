const GenericDAO = require('./generic.dao');

class CredencialDAO extends GenericDAO {
  constructor(Credencial) {
    super(Credencial);
  }
}

module.exports = CredencialDAO;
