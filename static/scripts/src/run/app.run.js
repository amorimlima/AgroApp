(function () {
  angular
    .module('app')
    .run(appRun);

  appRun.$inject = [
    '$rootScope',
    '$location',
    '$http',
    '$cookies',
    '$mdSidenav',
    '$mdToast'
  ];

  function appRun(
    $rootScope, 
    $location,
    $http,
    $cookies, 
    $mdSidenav, 
    $mdToast
  ) {

    $rootScope.$on('$routeChangeStart', function (ngEvent, next, current) {
      if (next.requireAuth && !$cookies.get('session')) {
        $location.url('/');
        ngEvent.preventDefault();
      }
      else {
        $http.defaults.headers.common['Authorization'] = $cookies.get('session');
      }
    });

    $rootScope.sidenav = {
      visible: false,
      toggle: function () { $mdSidenav('main_menu').toggle(); },
      items: [
        { name: 'Produtos', icon: 'shopping_basket', href: '#/meus-produtos' },
        { name: 'Busca', icon: 'search', href:'#/busca' }
      ]
    };

    $rootScope.showToast = function (message, duration) {
      return $mdToast
        .show({
          template: '<md-toast><div class="md-toast-content">' + message + '</div></md-toast>',
          hideDelay: duration || 1500,
          parent: document.getElementsByTagName('body')[0]
        });
    };

  }
})();
