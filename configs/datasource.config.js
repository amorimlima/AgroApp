var fs = require('fs');
var path = require('path');

var Sequelize = require('sequelize');
var models = require('../models');

var database = null;

function datasourceConfig(app) {
  if (database) {
    return database;
  }

  var forceSync = process.env.NODE_ENV === 'test';
  var dbNameSuffix = process.env.NODE_ENV ? '_' + process.env.NODE_ENV : '';
  var config = app.get('configs');
  var sequelize = new Sequelize(
    config.database.name + dbNameSuffix,
    config.database.username,
    config.database.password,
    config.database.options
  );

  database = { 
    sequelize: sequelize,
    Sequelize: Sequelize,
  };

  sequelize.sync({ force: forceSync }).done(function() {
    return database 
  });

  return database;
}

module.exports = datasourceConfig;
