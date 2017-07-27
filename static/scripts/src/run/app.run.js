function appRun($rootScope, $mdSidenav, $mdToast, $mdDialog, strings) {
  $rootScope.strings = strings;
  $rootScope.view = {
    name: 'Home',
    fullscreen: false
  };

  $rootScope.sidenav = {
    visible: false,
    toggle: function () {
      $mdSidenav('main_menu').toggle();
    },
    items: [
      { name: 'Produtos', icon: 'shopping_basket', href: '#/meus-produtos' }
    ]
  };

  $rootScope.toolbar = {};

  $rootScope.showToast = (message) => {
    return $mdToast
      .show({
        template: `
          <md-toast>
            <div class="md-toast-content">
              ${message}
            </div>
          </md-toast>`,
        hideDelay: 3000,
        parent: document.getElementsByTagName('body')[0]
      });
  };
}

appRun.$inject = [
  '$rootScope',
  '$mdSidenav',
  '$mdToast',
  'strings'
];

module.exports = appRun;
