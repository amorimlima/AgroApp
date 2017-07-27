const angular = require('angular');
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');
const ngMaterial = require('angular-material');

const commons = require('./commons');
const config = require('./config');
const run = require('./run');
const services = require('./services');
const controllers = require('./controllers');

const appModule = angular
  .module('app', [
    'ngRoute',
    'ngCookies',
    'ngMaterial'
  ]);

commons(appModule);

// Services
appModule.service('AutenticacaoService', services.AutenticacaoService);
appModule.service('CidadeEstadoService', services.CidadeEstadoService);
appModule.service('UsuarioService', services.UsuarioService);
appModule.service('LocalPersistanceService', services.LocalPersistanceService);

// Controllers
appModule.controller('LoginController', controllers.LoginController);
appModule.controller('SearchController', controllers.SearchController);
appModule.controller('PerfilRegisterController', controllers.PerfilRegisterController);
appModule.controller('CredentialRegisterController', controllers.CredentialRegisterController);
appModule.controller('PersonalDataRegisterController', controllers.PersonalDataRegisterController);
appModule.controller('CompanyDataRegisterController', controllers.CompanyDataRegisterController);
appModule.controller('ContactRegisterController', controllers.ContactRegisterController);
appModule.controller('MyProductsController', controllers.MyProductsController);

run(appModule);
run(appModule);
run(appModule);
run(appModule);
config(appModule);
