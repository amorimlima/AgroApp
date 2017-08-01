class PersonalDataRegisterController {
  constructor($rootScope, $location, LocalPersistanceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    this.cpf = parseInt(this.storage.getSessionItem('cpf')) || null;
    this.rg = this.storage.getSessionItem('rg') || '';
    this.nome = this.storage.getSessionItem('nome') || '';
    this.sobrenome = this.storage.getSessionItem('sobrenome') || '';
    this.data_nascimento = new Date(this.storage.getSessionItem('data_nascimento')) || new Date();

    this.cpfPattern = /\d{11}/;
    this.rgPattern = /\d{9}/;
  }

  goBack() {
    return this.$location.url('/registro/credencial');
  }

  goToContact() {
    this.storage.setSessionItem('cpf', this.cpf)
    this.storage.setSessionItem('rg', this.rg)
    this.storage.setSessionItem('nome', this.nome)
    this.storage.setSessionItem('sobrenome', this.sobrenome)
    this.storage.setSessionItem('data_nascimento', this.data_nascimento.toUTCString())
    return this.$location.url('/registro/contato')
  }
}

PersonalDataRegisterController.$inject = [
  '$rootScope',
  '$location',
  'LocalPersistanceService'
];

module.exports = PersonalDataRegisterController;
