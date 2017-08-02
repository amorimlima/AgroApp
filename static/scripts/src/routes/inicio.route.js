(function() {
  angular
    .module('app')
    .config(inicioRoute);
  
  inicioRoute.$inject = [
    '$routeProvider'
  ];

  function inicioRoute($routeProvider) {
    return $routeProvider
      .when('/', {
        controller: 'InicioController',
        controllerAs: 'loginCtrl',
        views: '/views/inicio'
      });
  }
})();
