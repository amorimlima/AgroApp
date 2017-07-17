const HttpStatus = require('http-status');

const responses = require('../utils').responses;

class GenericDAO {
  constructor(model) {
    this.model = model;
  }

  create(payload) {
    return this.model
      .create(payload)
      .then(model => responses.generic(model, HttpStatus.CREATED))
      .catch(() => responses.error('Ocorreu um erro ao criar o registro'));
  }

  getById(id) {
    return this.model
      .findById(id)
      .then(model => responses.generic(model))
      .catch(() => responses.error('Ocorreu um erro ao retornar o registro'));
  }

  getAll() {
    return this.model
      .findAll()
      .then(models => responses.generic(models))
      .catch(() => responses.error('Ocorreu um erro ao retornar o registro'));
  }

  update(payload, id) {
    return this.model
      .update(payload, { where: { id } })
      .then(rows => (new Promise((resolve, reject) => {
        this.model
          .findById(id)
          .then(model => resolve(responses.generic(model)))
          .catch(() => reject(responses.error('Ocorreu um erro ao retornar o registro')));
      })))
      .catch(() => response.error('Ocorreu um erro ao atualizar o registro'));
  }

  delete(id) {
    return this.model
      .destroy({ where: { id } })
      .then(rows => responses.generic(null, HttpStatus.NO_CONTENT))
      .catch(() => responses.error('Ocorreu um erro ao deletar o registro'));
  }
}

module.exports = GenericDAO;
