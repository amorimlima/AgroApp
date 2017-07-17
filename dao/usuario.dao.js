var GenericDAO = require('./generic.dao');

class UsuarioDAO extends GenericDAO {
  constructor(model) {
    super(model);
  }
};

module.exports = UsuarioDAO;
