const GenericDAO = require('./generic.dao');

class CredencialDAO extends GenericDAO {
  constructor(Credencial, Email, Perfil) {
    super(Credencial);
    this.Email = Email;
    this.Perfil = Perfil;
  }
}

module.exports = CredencialDAO;
