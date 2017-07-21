const appConfig = require('./app.config');
const datasourceConfig = require('./datasource.config');
const modelsConfig = require('./models.config');
const authConfig = require('./auth.config');

module.exports = {
  app: appConfig,
  datasource: datasourceConfig,
  models: modelsConfig,
  auth: authConfig
};
