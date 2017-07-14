var models = require('../models');
var utils = require('../utils');

function modelsConfig(app) {
  var sequelize = app.get('datasource').sequelize;
  var Sequelize = app.get('datasource').Sequelize;
  var configuredModels = [];
  var fillDatabase = null;
  
  models.forEach(function (modelTemplate) {
    var model = modelTemplate(configuredModels);
    configuredModels[model.name] = sequelize.import(model.name, model.constructor);
  });
  
  // utils.fillDatabase(configuredModels);

  if (process.env.NODE_ENV === 'test') {
    fillDatabase = utils.fillDatabase(configuredModels);
  }

  return configuredModels;
}

module.exports = modelsConfig;
