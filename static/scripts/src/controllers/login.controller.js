LoginController.$inject = [
  '$scope',
  '$rootScope'
];

function LoginController($scope, $rootScope) {
  $rootScope.view.name = 'Login';
}

module.exports = LoginController;