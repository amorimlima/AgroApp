class CredentialRegisterController {
  constructor($rootScope, $location, LocalPersistanceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    this.tipo = this.storage.getSessionItem('tipo');
    this.email = this.storage.getSessionItem('email') || '';
    this.senha = this.storage.getSessionItem('senha') || '';
  }

  goBack() {
    return this.$location.url('/registro/perfil');
  }

  goToPersonData(type) {
    this.storage.setSessionItem('email', this.email);
    this.storage.setSessionItem('senha', this.senha);
    return this.$location.url(`/registro/${type}`);
  }
}

CredentialRegisterController.$inject = [
  '$rootScope',
  '$location',
  'LocalPersistanceService'
];

module.exports = CredentialRegisterController;
