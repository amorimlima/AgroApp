var models = require('../models');

function modelsConfig(app) {
  var sequelize = app.get('datasource').sequelize;
  var Sequelize = app.get('datasource').Sequelize;
  var configuredModels = [];
  
  models.forEach(function (modelTemplate) {
    var model = modelTemplate(app);

    configuredModels[model.name] = sequelize.import(model.name, model.constructor);
  });

  return configuredModels;
}

module.exports = modelsConfig;
