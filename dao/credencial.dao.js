const GenericDAO = require('./generic.dao');

class CredencialDAO extends GenericDAO {
  constructor(models) {
    super(models.Credencial);
    this.Email = models.Email;
    this.Perfil = models.Perfil;
  }
}

module.exports = CredencialDAO;
