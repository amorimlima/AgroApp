class ContactRegisterController {
  constructor($rootScope, $location, $mdDialog, LocalPersistanceService) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.storage = LocalPersistanceService;

    this.estados = [{nome:"Acre",sigla:"AC"},{nome:"Alagoas",sigla:"AL"},{nome:"Amapá",sigla:"AP"},{nome:"Amazonas",sigla:"AM"},{nome:"Bahia ",sigla:"BA"},{nome:"Ceará",sigla:"CE"},{nome:"Distrito Federal ",sigla:"DF"},{nome:"Espírito Santo",sigla:"ES"},{nome:"Goiás",sigla:"GO"},{nome:"Maranhão",sigla:"MA"},{nome:"Mato Grosso",sigla:"MT"},{nome:"Mato Grosso do Sul",sigla:"MS"},{nome:"Minas Gerais",sigla:"MG"},{nome:"Pará",sigla:"PA"},{nome:"Paraíba",sigla:"PB"},{nome:"Paraná",sigla:"PR"},{nome:"Pernambuco",sigla:"PE"},{nome:"Piauí",sigla:"PI"},{nome:"Rio de Janeiro",sigla:"RJ"},{nome:"Rio Grande do Norte",sigla:"RN"},{nome:"Rio Grande do Sul",sigla:"RS"},{nome:"Rondônia",sigla:"RO"},{nome:"Roraima",sigla:"RR"},{nome:"Santa Catarina",sigla:"SC"},{nome:"São Paulo",sigla:"SP"},{nome:"Sergipe",sigla:"SE"},{nome:"Tocantins",sigla:"TO"}];

    this.tipo = this.storage.getSessionItem('tipo');
    this.cep = null;
    this.logradouro = '';
    this.numero = null;
    this.complemento = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';

    this.tipo_telefone = null;
    this.ddd = null;
    this.numero_telefone = null;

    this.cepPattern = /\d{8}/;
    this.dddPattern = /\d{2}/;
    this.telPattern = /(\d{8}|\d{9})/;
  }

  goBack() {
    if (this.tipo === 'PF')
      return this.$location.url('/registro/dados-pessoais');
    else
      return this.$location.url('/registro/dados-empresariais');
  }
}

ContactRegisterController.$inject = [
  '$rootScope',
  '$location',
  '$mdDialog',
  'LocalPersistanceService'
];

module.exports = ContactRegisterController;
