class LoginController {
  constructor($rootScope, $location, AutenticacaoService, PersistenceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.auth = AutenticacaoService;
    this.storage = PersistenceService;

    this.email = '';
    this.senha = '';
  }

  login() {
    this.auth
      .authenticate(this.email, this.senha)
      .then((token) => {
        this.storage.setPreference('token', token);
        this.$location.url('/meus-produtos');
      })
      .catch(() => console.log('Erro ao logar'));
  }
}

LoginController.$inject = [
  '$rootScope',
  '$location',
  'AutenticacaoService',
  'PersistenceService'
];



module.exports = LoginController;
