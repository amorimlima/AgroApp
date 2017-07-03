(function () {
  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$scope',
    '$rootScope'
  ];

  function LoginController($scope, $rootScope) {
    $rootScope.view.name = 'Login';
  }
})();
