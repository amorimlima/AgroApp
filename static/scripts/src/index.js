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
appModule.service('PersistenceService', services.PersistenceService);

// Controllers
appModule.controller('InicioController', controllers.Inicio);
appModule.controller('CadastroPerfilController', controllers.CadastroPerfil);
appModule.controller('CadastroCredencialController', controllers.CadastroCredencial);
appModule.controller('CadastroPessoaFisicaController', controllers.CadastroPessoaFisica);
appModule.controller('CadastroPessoaJuridicaController', controllers.CadastroPessoaJuridica);
appModule.controller('CadastroContatoController', controllers.CadastroContato);
appModule.controller('MeusProdutosController', controllers.MeusProdutos);
appModule.controller('BuscaController', controllers.Busca);

run(appModule);
config(appModule);
