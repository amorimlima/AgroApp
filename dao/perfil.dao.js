const GenericDAO = require('./generic.dao');

class PerfilDAO extends GenericDAO {
  constructor(Perfil) {
    super(Perfil);
  }
}

module.exports = PerfilDAO;
