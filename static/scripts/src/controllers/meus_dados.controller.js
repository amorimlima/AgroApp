import angular from 'angular'

(function () {
  angular
    .module('app')
    .controller('MeusDadosController', MeusDadosController);

  MeusDadosController.$inject = [
    '$rootScope',
    'usuario'
  ];

  function MeusDadosController($rootScope, usuario) {
    var self = this;

    self.usuario = usuario;
  }
})();