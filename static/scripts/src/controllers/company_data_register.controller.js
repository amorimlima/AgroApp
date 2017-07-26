class CompanyDataRegisterController {
  constructor($rootScope, $location, LocalPersistanceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    this.cnpj = parseInt(this.storage.getSessionItem('cnpj')) || null;
    this.razao_social = this.storage.getSessionItem('razao_social') || '';
    this.responsavel = this.storage.getSessionItem('responsavel') || '';
    this.data_fundacao = new Date(this.storage.getSessionItem('data_fundacao')) || new Date();
    
    this.cnpjPattern = /\d{14}/;
  }

  goBack() {
    return this.$location.url('/registro/credencial');
  }

  goToContact() {
    this.storage.setSessionItem('cnpj', this.cnpj)
    this.storage.setSessionItem('razao_social', this.razao_social)
    this.storage.setSessionItem('responsavel', this.responsavel)
    this.storage.setSessionItem('data_fundacao', this.data_fundacao.toUTCString())
    return this.$location.url('/registro/contato')
  }
}

CompanyDataRegisterController.$inject = [
  '$rootScope',
  '$location',
  'LocalPersistanceService'
];

module.exports = CompanyDataRegisterController;
