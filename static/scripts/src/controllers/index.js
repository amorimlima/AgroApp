/**
 * Created by Lucas Tavares on 04/07/2017.
 */
var LoginController = require('./login.controller');

function controllers(angular, moduleName) {
  angular
    .module(moduleName)
    .controller('LoginController', LoginController);
}

module.exports = controllers;
