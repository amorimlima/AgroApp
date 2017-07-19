const UsuarioService = require('../../../static/scripts/src/services').UsuarioService;

describe('UsuarioService', () => {
  const defaultUser = {
    id: 1,
    tipo: 'PF',
    email: {
      id: 1,
      usuario: 1,
      email: 'usuario@mail.com'
    },
    credencial: {
      id: 1,
      usuario: 1,
      email: 1,
      senha: '$2a$10$B.ZiBwy1RUY.uN0.AZkpMOIJz8IAA8wqoz.cSwJLCLpchbeXOWZFm'
    }
  };
  const $http = {
    get: td.function(),
    post: td.function(),
    put: td.function(),
    delete: td.function()
  }
  let usuarioService = null;

  beforeEach(() => {
    usuarioService = new UsuarioService($http);
  });

  it('#registerCredentials deveria registrar as credenciais de um usuario', (done) => {
    const usuario = { tipo: 'PF' };
    const email = { email: 'usuario@mail.com' };
    const credencial = { senha: 'd3f4u1tp455w0rd' };

    td.when($http.post('/usuario/registro/credencial', { usuario, email, credencial }))
      .thenResolve({data: defaultUser});

    usuarioService
      .registerCredentials(usuario, email, credencial)
      .then((newUser) => {
        expect(newUser.id).to.be.eql(defaultUser.id)
        expect(newUser.tipo).to.be.eql(defaultUser.tipo);
        expect(newUser.email.id).to.be.eql(defaultUser.email.id);
        expect(newUser.email.usuario).to.be.eql(defaultUser.email.usuario);
        expect(newUser.email.email).to.be.eql(defaultUser.email.email);
        expect(newUser.credencial.id).to.be.eql(defaultUser.credencial.id);
        expect(newUser.credencial.usuario).to.be.eql(defaultUser.credencial.usuario);
        expect(newUser.credencial.email).to.be.eql(defaultUser.credencial.email);
        expect(newUser.credencial.senha).to.be.eql(defaultUser.credencial.senha);
        done();
      });
  });
  
  it('#registerPersonalData deveria registrar os dados pessoais de um usuário', (done) => {
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
    const usuario = { tipo: 'PF' };
    const telefone = { usuario: 1, tipo: 1, ddd: 11, numero: 22334455 };
    const pessoa_fisica = {
      cpf: 22233366638,
      usuario: 1,
      rg: '376892407',
      nome: 'Usuario',
      sobrenome: 'Teste',
      data_nascimento: '1988-05-02'
    };
    const pessoa_juridica = {};

    td.when($http.post('/usuario/registro/dados-pessoais', {
      usuario,
      telefone,
      pessoa_fisica,
      pessoa_juridica
    })).thenResolve({ data: expectedResponse });

    usuarioService
      .registerPersonalData(usuario, telefone, pessoa_fisica, pessoa_juridica)
      .then((response) => {
        expect(response.pessoa_fisica.cpf).to.be.eql(expectedResponse.pessoa_fisica.cpf);
        expect(response.pessoa_fisica.usuario).to.be.eql(expectedResponse.pessoa_fisica.usuario);
        expect(response.pessoa_fisica.rg).to.be.eql(expectedResponse.pessoa_fisica.rg);
        expect(response.pessoa_fisica.nome).to.be.eql(expectedResponse.pessoa_fisica.nome);
        expect(response.pessoa_fisica.sobrenome).to.be.eql(expectedResponse.pessoa_fisica.sobrenome);
        expect(response.pessoa_fisica.data_nascimento).to.be.eql(expectedResponse.pessoa_fisica.data_nascimento);
        expect(response.telefone.usuario).to.be.eql(expectedResponse.telefone.usuario);
        expect(response.telefone.ddd).to.be.eql(expectedResponse.telefone.ddd);
        expect(response.telefone.numero).to.be.eql(expectedResponse.telefone.numero);
        done();
      });
  });
});
