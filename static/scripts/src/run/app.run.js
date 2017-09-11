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
    '$mdToast',
    'DateHelper',
    'PessoaHelper',
    'UsuarioService',
    'PersistenceService'
  ];

  function appRun(
    $rootScope, 
    $location,
    $http,
    $cookies, 
    $mdSidenav, 
    $mdToast,
    DateHelper,
    PessoaHelper,
    UsuarioService,
    PersistenceService
  ) {
    $rootScope.logado = false;
    $rootScope.DateHelper = DateHelper;
    $rootScope.PessoaHelper = PessoaHelper;

    /**
     * Verifica se a próxima rota e se o usuário está autenticado para redirecioná-lo ou não para
     * a tela de login, caso não esteja, ou para a sua lista de produtos, caso esteja.
     */
    $rootScope.$on('$routeChangeStart', function (ngEvent, next, current) {
      if (next.requireAuth && !$cookies.get('session')) {
        $location.url('/');
        ngEvent.preventDefault();
      }
      else if (!next.requireAuth && $cookies.get('session')) {
        $rootScope.logado = true;
        $http.defaults.headers.common['Authorization'] = $cookies.get('session');
        $location.url('/meus-produtos');
        ngEvent.preventDefault();
      }
      else {
        $http.defaults.headers.common['Authorization'] = $cookies.get('session');
      }
    });

    /**
     * Observa quando requisições são iniciadas e finalizadas para controlar a exibição da barra
     * de progresso linear.
     */
    $rootScope.$on('loading:progress', function() {
      $rootScope.loading = true;
    });

    $rootScope.$on('loading:finish', function() {
      $rootScope.loading = false;
    });

    /**
     * Observa quando o usuário faz login ou logoff para buscar seus dados e persisti-los localmente
     * e exibir no sidenav ou removê-los.
     */
    $rootScope.$on('login', function () {
      $rootScope.logado = true;
    });

    $rootScope.$on('logoff', function () {
      $rootScope.sidenav.usuario = { nome: '', documento: '', tipo: '' };
      $rootScope.logado = false;
      return PersistenceService.removePreference('usuario');
    });

    /**
     * Estado da Sidenav
     */
    $rootScope.sidenav = {
      usuario: { nome: '', documento: '', tipo: '' },
      visible: false,
      toggle: function () { $mdSidenav('main_menu').toggle(); },
      items: [
        { name: 'Produtos',  icon: 'shopping_basket', href: '#/meus-produtos' },
        { name: 'Busca',     icon: 'search',          href: '#/busca' },
        { name: 'Favoritos', icon: 'favorite',        href: '#/favoritos' }
      ]
    };

    /**
     * Exibe um snackbar com a mensagem fornecida e duração (opcional).
     */
    $rootScope.showToast = function (message, duration) {
      return $mdToast
        .show({
          template: '<md-toast><div class="md-toast-content">' + message + '</div></md-toast>',
          hideDelay: duration || 1500,
          parent: document.getElementsByTagName('body')[0]
        });
    };

    $rootScope.buscarDadosDoLogado = function () {
      UsuarioService
        .buscarDadosDoLogado()
        .then(function (dados) {
          $rootScope.logado = true;
          $rootScope.sidenav.usuario.nome = PessoaHelper.getNomeDaPessoa(dados);
          $rootScope.sidenav.usuario.documento = PessoaHelper.getDocumentoPrincipal(dados);
          $rootScope.sidenav.usuario.tipo = PessoaHelper.getTipoPessoa(dados);
          return PersistenceService.setPreference('usuario', JSON.stringify(dados));
        })
        .catch(function (err) { $rootScope.showToast('Ocorreu um erro ao buscar seus dados'); });
    }

    /**
     * Limpa os dados do usuário e encerra a sessão.
     */
    $rootScope.sair = function () {
      $rootScope.sidenav.toggle();
      $rootScope.$broadcast('logout');
      $cookies.remove('session');
      $location.url('/');
    };
  }
})();