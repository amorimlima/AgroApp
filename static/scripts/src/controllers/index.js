/**
 * Created by Lucas Tavares on 04/07/2017.
 */
var LoginController = require('./login.controller');
var SearchController = require('./search.controller');

function controllers(angular, moduleName) {
  angular
    .module(moduleName)
    .controller('LoginController', LoginController);

  angular
    .module(moduleName)
    .controller('SearchController', SearchController);
}

module.exports = controllers;
