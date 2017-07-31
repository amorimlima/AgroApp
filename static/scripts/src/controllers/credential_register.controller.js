class CredentialRegisterController {
  constructor($rootScope, $location, LocalPersistanceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    this.tipo = this.storage.getSessionItem('tipo');
    this.email = this.storage.getSessionItem('email') || '';
    this.senha = this.storage.getSessionItem('senha') || '';

    this.credencial = JSON.parse(this.storage.getSessionItem('credencial'))
                      || this.$location.url('/registro/perfil');

    this.email = JSON.parse(this.storage.getSessionItem('email'))
                  || this.$location.url('/registro/perfil');

    this.usuario = JSON.parse(this.storage.getSessionItem('usuario'))
                    || this.$location.url('/registro/perfil');
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
