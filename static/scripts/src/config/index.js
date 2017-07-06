/**
 * Created by Lucas Tavares on 04/07/2017.
 */

var routeConfig = require('./route.config');

function config(appModule) {
  appModule.config(routeConfig);
}

module.exports = config;
