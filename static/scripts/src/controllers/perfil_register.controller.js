class PerfilRegisterController {
  constructor($rootScope, $location, LocalPersistanceService) {
    // Providers
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    // Models
    this.perfil = parseInt(this.storage.getSessionItem('perfil')) || null;
    this.tipo = this.storage.getSessionItem('tipo');
  }
  
  goBack() {
    this.storage.clearSessionItems()
    this.$location.url('/');
  }

  goToCredential() {
    this.storage.setSessionItem('tipo', this.tipo)
    this.storage.setSessionItem('perfil', this.perfil)
    return this.$location.url('/registro/credencial')
  }
}

PerfilRegisterController.$inject = [
  '$rootScope',
  '$location',
  'LocalPersistanceService'
];

module.exports = PerfilRegisterController;
