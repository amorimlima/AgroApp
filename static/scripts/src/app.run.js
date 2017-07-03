(function () {
  angular
    .module('app')
    .run(appRun);

  appRun.$inject = [
    '$rootScope',
    '$mdSidenav'
  ];

  function appRun($rootScope, $mdSidenav) {
    $rootScope.view = {
      name: 'Home',
      fullscreen: false
    };
    $rootScope.sidenav = {};
    $rootScope.toolbar = {};

    $rootScope.initToolbar = function () {
      return true;
    };

    $rootScope.initSidenav = function () {
      $rootScope.sidenav = {
        visible: false,
        toggle: function () {
          $mdSidenav('main_menu').toggle();
        },
        items: [
          { name: 'Pagina Inicial', icon: 'home' },
          { name: 'Produtos', icon: 'shopping_basket' },
          { name: 'Editar Perfil', icon: 'person' },
          { name: 'Contatos', icon: 'contacts' }
        ]
      };
    };
  }
})();
