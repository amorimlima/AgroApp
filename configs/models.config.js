// const models = require('../models');
const fs = require('fs');
const path = require('path');
const utils = require('../utils');

const modelsConfig = (app) => {
  const sequelize = app.get('datasource').sequelize;
  const Sequelize = app.get('datasource').Sequelize;
  const modelsDir = path.join(__dirname, '../models');
  const models = [];

  fs.readdirSync(modelsDir)
    .filter(file => (file.indexOf('.') !== 0))
    .forEach((file) => {
      const model = sequelize.import(path.join(modelsDir, file));
      models[model.name] = model;
    });
  
  Object
    .keys(models)
    .forEach((modelName) => {
      if ('associate' in models[modelName]) {
        models[modelName].associate(models);
      }
    });

    //  fillDatabase = utils.fillDatabase(models);

  return models;
};

module.exports = modelsConfig;
