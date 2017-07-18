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
    telefone: { id: 1, tipo: 1, ddd: 11, numero: 22334455 }
  };
  const usuarioService = {
    register: td.function()
  };
  let registerController = null;

  beforeEach(() => {
    registerController = new RegisterController(usuarioService);
  });

  it('#registerStepOne deveria registar um usuario, um email e uma credencial', (done) => {
    registerController.usuario = { tipo: 'PF' };
    registerController.email = { email: 'usuario@mail.com' };
    registerController.credencial = { senha: 'd3f4u1tp455w0rd' };
    
    td.when(usuarioService.register(
      registerController.usuario, 
      registerController.email, 
      registerController.credencial
    )).thenResolve(defaultUser);

    registerController
      .registerStepOne()
      .then((newUser) => {
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
});
