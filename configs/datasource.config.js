const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const models = require('../models');

let database = null;

const datasourceConfig = (app) => {
  if (database) {
    return database;
  }
  const env = process.env.NODE_ENV.trim();
  const dbNameSuffix = env ? '_' + env : '';
  const config = app.get('configs');
  const sequelize = new Sequelize(
    config.database.name + dbNameSuffix,
    config.database.username,
    config.database.password,
    config.database.options
  );

  database = { 
    sequelize: sequelize,
    Sequelize: Sequelize,
  };

  sequelize.sync().done(function() {
    return database;
  });

  return database;
}

module.exports = datasourceConfig;
