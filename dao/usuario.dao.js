var GenericDAO = require('./generic.dao');

class UsuarioDAO extends GenericDAO {
  constructor(models) {
    super(models.Usuario);
  }
};

module.exports = UsuarioDAO;
