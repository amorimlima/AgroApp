/**
 * Created by Lucas Tavares on 04/07/2017.
 */
var LoginController = require('./login.controller');
var SearchController = require('./search.controller');

function controllers(appModule) {
  appModule.controller('LoginController', LoginController);
  appModule.controller('SearchController', SearchController);
}

module.exports = controllers;
