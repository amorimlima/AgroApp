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

  it ('#register deveria registrar um novo usuario', (done) => {
    const usuario = { tipo: 'PF' };
    const email = { email: 'usuario@mail.com' };
    const credencial = { senha: 'd3f4u1tp455w0rd' };

    td.when($http.post('/usuario/register', { usuario, email, credencial }))
      .thenResolve({data: defaultUser});

    usuarioService
      .register(usuario, email, credencial)
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
  })
});
