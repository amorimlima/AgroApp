(function () {
  angular
    .module('app')
    .controller('CoverController', CoverController);

  CoverController.$inject = [
    '$scope',
    '$rootScope'
  ];

  function CoverController($scope, $rootScope) {
    $rootScope.view.name = 'Login';
  }
})();
