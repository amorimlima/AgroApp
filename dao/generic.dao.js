class GenericDAO {
  constructor(model) {
    this.model = model;
  }

  getById(id) {
    return this.model.findById(id);
  }

  getAll() {
    return this.model.findAll();
  }

  create(payload) {
    return this.model.create(payload);
  }

  update(payload, id) {
    return this.model.update(payload, { where: { id } });
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

module.exports = GenericDAO;
