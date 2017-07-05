LoginController.$inject = [
  '$rootScope',
  '$location'
];

function LoginController($rootScope, $location) {
  $rootScope.view.name = 'Login';
  
  this.login = function () {
    $location.url('/search');
  };
}

module.exports = LoginController;