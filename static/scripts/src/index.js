const angular = require('angular');
const ngRoute = require('angular-route');
const ngMaterial = require('angular-material');

const commons = require('./commons');
const config = require('./config');
const run = require('./run');
const services = require('./services');
const controllers = require('./controllers');

const appModule = angular
  .module('app', [
    'ngRoute',
    'ngMaterial'
  ]);

commons(appModule);

// Services
appModule.service('AutenticacaoService', services.AutenticacaoService);
appModule.service('CidadeEstadoService', services.CidadeEstadoService);
appModule.service('UsuarioService', services.UsuarioService);

// Controllers
appModule.controller('LoginController', controllers.LoginController);
appModule.controller('SearchController', controllers.SearchController);
appModule.controller('RegisterController', controllers.RegisterController);

run(appModule);
config(appModule);
