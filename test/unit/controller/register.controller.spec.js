const RegisterController = require('../../../static/scripts/src/controllers').RegisterController;

describe('RegisterController', () => {
  const defaultUser = {
    id: 1,
    tipo: 'PF',
    email: { id: 1, usuario: 1, email: 'usuario@mail.com' },
    credencial: {
      id: 1,
      usuario: 1,
      email: 1,
      senha: '$2a$10$B.ZiBwy1RUY.uN0.AZkpMOIJz8IAA8wqoz.cSwJLCLpchbeXOWZFm'
    },
    pessoa_fisica: {
      cpf: 22233366638,
      rg: '376892407',
      nome: 'Usuario',
      sobrenome: 'Teste',
      data_nascimento: '1988-05-02'
    },
    pessoa_juridica: {
      cnpj: 15793756000102,
      razao_social: 'Empresa de Teste LTDA',
      responsavel: 'Responsável de Teste',
      data_fundacao: '1994-04-28'
    },
    telefone: { id: 1, tipo: 1, ddd: 11, numero: 22334455 }
  };
  const $rootScope = { view: {} };
  const $location = { url: td.function() };
  const perfis = [ { id: 2, nome: 'Produtor' } ];
  const estados = [];
  const usuarioService = {
    registerCredentials: td.function(),
    registerPersonalData: td.function()
  };
  const autenticacaoService = { authenticate: td.function() };
  const token = { token: 'abc' };
  let idUsuario = null;
  let registerController = null;

  beforeEach(() => {
    registerController = new RegisterController(
      $rootScope,
      $location,
      usuarioService,
      autenticacaoService,
      perfis,
      estados
    );
  });

  it('deveria ser inicializado com uma lista de perfis para cadastro', () => {
    expect(registerController.perfis[0].id).to.be.eql(perfis[0].id);
    expect(registerController.perfis[0].nome).to.be.eql(perfis[0].nome);
  });

  it('#registerStepOne deveria registar um usuario, um email e uma credencial', (done) => {
    registerController.usuario = { tipo: 'PF' };
    registerController.email = { email: 'usuario@mail.com' };
    registerController.credencial = { senha: 'd3f4u1tp455w0rd' };
    
    td.when(usuarioService.registerCredentials(
      registerController.usuario, 
      registerController.email, 
      registerController.credencial
    )).thenResolve(defaultUser);

    registerController
      .registerStepOne()
      .then(() => {
        expect(registerController.step).to.be.eql(2);
        expect(registerController.usuario.id).to.be.eql(defaultUser.id)
        expect(registerController.usuario.tipo).to.be.eql(defaultUser.tipo);
        expect(registerController.email.id).to.be.eql(defaultUser.email.id);
        expect(registerController.email.usuario).to.be.eql(defaultUser.email.usuario);
        expect(registerController.email.email).to.be.eql(defaultUser.email.email);
        expect(registerController.credencial.id).to.be.eql(defaultUser.credencial.id);
        expect(registerController.credencial.usuario).to.be.eql(defaultUser.credencial.usuario);
        expect(registerController.credencial.email).to.be.eql(defaultUser.credencial.email);
        expect(registerController.credencial.senha).to.be.eql(defaultUser.credencial.senha);
        done();
      });
  });

  it('#registerStepTwo deveria registrar uma PF/PJ e um telefone', (done) => {
    const expectedResponse = {
      pessoa_fisica: {
        cpf: 22233366638,
        usuario: 1,
        rg: '376892407',
        nome: 'Usuario',
        sobrenome: 'Teste',
        data_nascimento: '1988-05-02'
      },
      pessoa_juridica: {
        cnpj: 15793756000102,
        usuario: 1,
        razao_social: 'Empresa de Teste LTDA',
        responsavel: 'Responsável de Teste',
        data_fundacao: '1994-04-28'
      },
      telefone: { id: 1, usuario: 1, tipo: 1, ddd: 11, numero: 22334455 }
    };

    registerController.usuario = { tipo: 'PF' };
    registerController.pessoa_fisica = {
      cpf: 22233366638,
      usuario: 1,
      rg: '376892407',
      nome: 'Usuario',
      sobrenome: 'Teste',
      data_nascimento: '1988-05-02'
    };
    registerController.pessoa_juridica = {};
    registerController.telefone = { usuario: 1, tipo: 1, ddd: 11, numero: 22334455 };

    td.when(usuarioService.registerPersonalData(
      registerController.usuario, 
      registerController.telefone,
      registerController.pessoa_fisica,
      registerController.pessoa_juridica
    )).thenResolve(expectedResponse);

    registerController
      .registerStepTwo()
      .then(() => {
        expect(registerController.step).to.be.eql(3);
        expect(registerController.telefone.usuario).to.be.eql(expectedResponse.telefone.usuario);
        expect(registerController.telefone.tipo).to.be.eql(expectedResponse.telefone.tipo);
        expect(registerController.telefone.ddd).to.be.eql(expectedResponse.telefone.ddd);
        expect(registerController.telefone.numero).to.be.eql(expectedResponse.telefone.numero);
        expect(registerController.pessoa_fisica.usuario).to.be.eql(expectedResponse.pessoa_fisica.usuario);
        expect(registerController.pessoa_fisica.cpf).to.be.eql(expectedResponse.pessoa_fisica.cpf);
        expect(registerController.pessoa_fisica.rg).to.be.eql(expectedResponse.pessoa_fisica.rg);
        expect(registerController.pessoa_fisica.nome).to.be.eql(expectedResponse.pessoa_fisica.nome);
        expect(registerController.pessoa_fisica.sobrenome).to.be.eql(expectedResponse.pessoa_fisica.sobrenome);
        expect(registerController.pessoa_fisica.data_nascimento).to.be.eql(expectedResponse.pessoa_fisica.data_nascimento);
        done();
      });
  });

  it('#registerStepThree deveria finalizar o cadastro e autenticar o usuário', (done) => {
    td.when(autenticacaoService.authenticate(
      registerController.email.email,
      registerController.credencial.senha
    )).thenResolve({ token });
    td.when($location.url('/meus-produtos')).thenReturn('/meus-produtos');
    td.when($location.url()).thenReturn('/meus-produtos');

    registerController
      .registerStepThree()
      .then(() => {
        expect(registerController.$location.url()).to.be.eql('/meus-produtos');
        done();
      })
  });
});
