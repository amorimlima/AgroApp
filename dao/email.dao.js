const GenericDAO = require('./generic.dao');

class EmailDAO extends GenericDAO {
  constructor(Email) {
    super(Email);
  }
}

module.exports = EmailDAO;
