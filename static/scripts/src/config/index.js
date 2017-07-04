/**
 * Created by Lucas Tavares on 04/07/2017.
 */

var routeConfig = require('./route.config');

function config(angular, moduleName) {
  angular
    .module(moduleName)
    .config(routeConfig);
}

module.exports = config;
