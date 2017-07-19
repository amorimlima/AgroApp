const models = require('../models');
const utils = require('../utils');

const modelsConfig = (app) => {
  const sequelize = app.get('datasource').sequelize;
  const Sequelize = app.get('datasource').Sequelize;
  const configuredModels = [];
  let fillDatabase = null;
  
  models.forEach((modelTemplate) => {
    const model = modelTemplate(configuredModels);
    configuredModels[model.name] = sequelize.import(model.name, model.constructor);
  });

  if (process.env.NODE_ENV === 'dev') {
    fillDatabase = utils.fillDatabase(configuredModels);
  }

  return configuredModels;
}

module.exports = modelsConfig;
