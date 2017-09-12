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
    $rootScope.DateHelper   = DateHelper;
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
      $rootScope.buscarDadosDoLogado();
    });

    $rootScope.$on('logout', function () {
      $rootScope.limparDadosDoLogado()
        .then(function () {
          $rootScope.sidenav.usuario = { nome: '', documento: '', tipo: '' };
          $rootScope.logado = false;
        })
        .catch(function () { })
    });

    $rootScope.$on('logged-in-data-loaded', function () {
      $rootScope.carregarDadosDoUsuario();
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
        { name: 'Busca',     icon: 'search',          href: '#/busca'         },
        { name: 'Favoritos', icon: 'favorite',        href: '#/favoritos'     }
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
        .buscarDadosDoLogado($cookies.get('session'))
        .then(function (dados) {
          var Usuario = JSON.stringify({ id: dados.id, tipo: dados.tipo, Perfil: dados.Perfil });

          PersistenceService.setPreference('Usuario', Usuario);
          PersistenceService.setPreference('PessoaJuridica', JSON.stringify(dados.PessoaJuridica));
          PersistenceService.setPreference('PessoaFisica', JSON.stringify(dados.PessoaFisica));
          PersistenceService.setPreference('Telefones', JSON.stringify(dados.Telefones));
          PersistenceService.setPreference('Enderecos', JSON.stringify(dados.Enderecos));
          PersistenceService.setPreference('Emails', JSON.stringify(dados.Emails));

          return $rootScope.$broadcast('logged-in-data-loaded');

        })
        .catch(function (err) { $rootScope.showToast('Ocorreu um erro ao buscar seus dados'); });
    };

    $rootScope.limparDadosDoLogado = function () {
      return new Promise(function(resolve, reject) {
        try {
          PersistenceService.removePreference('Usuario');
          PersistenceService.removePreference('PessoaJuridica');
          PersistenceService.removePreference('PessoaFisica');
          PersistenceService.removePreference('Telefones');
          PersistenceService.removePreference('Enderecos');
          PersistenceService.removePreference('Emails');
          resolve($rootScope.$broadcast('logged-in-data-removed'));
        }
        catch (e) {
          reject(e);
        }
      });
    }

    $rootScope.carregarDadosDoUsuario = function () {
      var Usuario = JSON.parse(PersistenceService.getPreference('Usuario'));

      Usuario.PessoaJuridica = JSON.parse(PersistenceService.getPreference('PessoaJuridica'));
      Usuario.PessoaFisica = JSON.parse(PersistenceService.getPreference('PessoaFisica'));;

      $rootScope.sidenav.usuario.nome = PessoaHelper.getNomeDaPessoa(Usuario);
      $rootScope.sidenav.usuario.documento = PessoaHelper.getDocumentoPrincipal(Usuario);
      $rootScope.sidenav.usuario.tipo = PessoaHelper.getTipoPessoa(Usuario);
    };

    /**
     * Limpa os dados do usuário e encerra a sessão.
     */
    $rootScope.sair = function () {
      $rootScope.sidenav.toggle();
      $cookies.remove('session');
      $location.url('/');
      $rootScope.$broadcast('logout');
    };
  }
})();