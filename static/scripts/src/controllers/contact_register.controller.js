class ContactRegisterController {
  constructor($rootScope, $location, $mdDialog, LocalPersistanceService, 
    UsuarioService, AutenticacaoService) {

    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.storage = LocalPersistanceService;
    this.usuarioService = UsuarioService;
    this.auth = AutenticacaoService;

    this.estados = [{nome:"Acre",sigla:"AC"},{nome:"Alagoas",sigla:"AL"},{nome:"Amapá",sigla:"AP"},{nome:"Amazonas",sigla:"AM"},{nome:"Bahia ",sigla:"BA"},{nome:"Ceará",sigla:"CE"},{nome:"Distrito Federal ",sigla:"DF"},{nome:"Espírito Santo",sigla:"ES"},{nome:"Goiás",sigla:"GO"},{nome:"Maranhão",sigla:"MA"},{nome:"Mato Grosso",sigla:"MT"},{nome:"Mato Grosso do Sul",sigla:"MS"},{nome:"Minas Gerais",sigla:"MG"},{nome:"Pará",sigla:"PA"},{nome:"Paraíba",sigla:"PB"},{nome:"Paraná",sigla:"PR"},{nome:"Pernambuco",sigla:"PE"},{nome:"Piauí",sigla:"PI"},{nome:"Rio de Janeiro",sigla:"RJ"},{nome:"Rio Grande do Norte",sigla:"RN"},{nome:"Rio Grande do Sul",sigla:"RS"},{nome:"Rondônia",sigla:"RO"},{nome:"Roraima",sigla:"RR"},{nome:"Santa Catarina",sigla:"SC"},{nome:"São Paulo",sigla:"SP"},{nome:"Sergipe",sigla:"SE"},{nome:"Tocantins",sigla:"TO"}];

    this.tipo = this.storage.getSessionItem('tipo');
    this.cep = this.storage.getSessionItem('cep') || null;
    this.logradouro = this.storage.getSessionItem('logradouro') || '';
    this.numero = parseInt(this.storage.getSessionItem('numero')) ||  null;
    this.complemento = this.storage.getSessionItem('complemento') || '';
    this.bairro = this.storage.getSessionItem('bairro') || '';
    this.cidade = this.storage.getSessionItem('cidade') || '';
    this.estado = this.storage.getSessionItem('estado') || '';
    this.tipo_telefone = parseInt(this.storage.getSessionItem('tipo_telefone')) || null;
    this.ddd = parseInt(this.storage.getSessionItem('ddd')) || null;
    this.numero_telefone = parseInt(this.storage.getSessionItem('numero_telefone')) || null;

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

  goToTermsOfUse() {
    this.storage.setSessionItem('tipo', this.tipo);
    this.storage.setSessionItem('cep', this.cep);
    this.storage.setSessionItem('logradouro', this.logradouro);
    this.storage.setSessionItem('numero', this.numero);
    this.storage.setSessionItem('complemento', this.complemento);
    this.storage.setSessionItem('bairro', this.bairro);
    this.storage.setSessionItem('cidade', this.cidade);
    this.storage.setSessionItem('estado', this.estado);
    this.storage.setSessionItem('tipo_telefone', this.tipo_telefone);
    this.storage.setSessionItem('ddd', this.ddd);
    this.storage.setSessionItem('numero_telefone', this.numero_telefone);
    return this.$mdDialog.show({
      contentElement: document.getElementById('terms_of_use_dialog'),
      parent: document.getElementsByTagName('body')[0]
    });
  }

  cancelRegister() {
    this.storage.clearSessionItems();
    return this.$location.url('/entrar');
  }

  completeRegister() {
    //usuario, email, credencial, pf, pj, endereco, telefone
    const nascimento = new Date(this.storage.getSessionItem('data_nascimento'));
    const fundacao = new Date(this.storage.getSessionItem('data_fundacao'));
    const usuario = { tipo: this.storage.getSessionItem('tipo') };
    const email = { email: this.storage.getSessionItem('email') };
    const credencial = {
      perfil: parseInt(this.storage.getSessionItem('perfil')),
      senha: this.storage.getSessionItem('senha')
    };
    const endereco = {
      cep: this.storage.getSessionItem('cep'),
      logradouro: this.storage.getSessionItem('logradouro'),
      numero: parseInt(this.storage.getSessionItem('numero')),
      complemento: this.storage.getSessionItem('complemento') || null,
      bairro: this.storage.getSessionItem('bairro'),
      cidade: this.storage.getSessionItem('cidade'),
      estado: this.storage.getSessionItem('estado')
    };
    const telefone = {
      tipo: parseInt(this.storage.getSessionItem('tipo_telefone')),
      ddd: parseInt(this.storage.getSessionItem('ddd')),
      numero: parseInt(this.storage.getSessionItem('numero_telefone'))
    };
    let pf = {
      cpf: this.storage.getSessionItem('cpf'),
      rg: this.storage.getSessionItem('rg'),
      nome: this.storage.getSessionItem('nome'),
      sobrenome: this.storage.getSessionItem('sobrenome'),
      data_nascimento: `${nascimento.getFullYear()}-${nascimento.getMonth() + 1}-${nascimento.getDate()}`
    };
    let pj = {
      cnpj: this.storage.getSessionItem('cnpj'),
      razao_social: this.storage.getSessionItem('razao_social'),
      responsavel: this.storage.getSessionItem('responsavel'),
      data_funcadao: `${fundacao.getFullYear()}-${fundacao.getMonth() + 1}-${fundacao.getDate()}`
    };

    if (usuario.tipo === 'PF')
      pj = null;
    else
      pf = null;

    return this.usuarioService
      .register(usuario, email, credencial, pf, pj, endereco, telefone)
      .then(user => this.auth.authenticate(this.storage.getSessionItem('email'), this.storage.getSessionItem('senha')))
      .then((token) => {
        this.storage.setPreference('token', token);
        this.goToMyProducts();
      }); 
  }

  goToMyProducts() {
    this.$location.url('/meus-produtos');
  }
}

ContactRegisterController.$inject = [
  '$rootScope',
  '$location',
  '$mdDialog',
  'LocalPersistanceService',
  'UsuarioService',
  'AutenticacaoService'
];

module.exports = ContactRegisterController;
