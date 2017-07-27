const GenericDAO = require('./generic.dao');

class CredencialDAO extends GenericDAO {
  constructor(models) {
    super(models.Credencial);
    this.Email = Email;
    this.Perfil = Perfil;
  }
}

module.exports = CredencialDAO;
