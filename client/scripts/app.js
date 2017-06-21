(function () {
  angular
    .module('app', [
      'ngRoute',
      'ngMaterial'
    ]);

  angular
    .module('app')
    .run(appRun);

  angular
    .module('app')
    .constant('WEB_SERVICE_URL', 'localhost:8090');

  appRun.$inject = ['$rootScope', '$location'];

  function appRun($rootScope, $location) {
    $rootScope.view = {
      name: 'Home',
      fullscreen: false
    };

    $rootScope.sidenav = {
      visible: false,
      toggle: function () {
        this.visible = !this.visible;
      }
    };
  }
})();
