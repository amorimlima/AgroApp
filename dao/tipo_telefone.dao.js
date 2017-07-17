const GenericDAO = require('./generic.dao');

class TipoTelefoneDAO extends GenericDAO {
  constructor(TipoTelefone) {
    super(TipoTelefone);
  }
}

module.exports = TipoTelefoneDAO;
