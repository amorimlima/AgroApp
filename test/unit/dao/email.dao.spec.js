const EmailDAO = require('../../../dao').EmailDAO;

describe('EmailDAO', () => {
  const models = {
    Email: { findOne: td.function() },
    Credencial: { findOne: td.function() },
    Usuario: { findOne: td.function() },
    Perfil: { findOne: td.function() }
  };
  const defaultEmail = {
    id: 1,
    usuario: 1,
    email: 'usuario@mail.com',
    get: function() { return this }
  };
  const defaultCredencial = {
    id: 1,
    usuario: 1,
    perfil: 2,
    email: 1,
    senha: 'd3f41tp455w0rd',
    get: function() { return this }
  };
  const defaultUsuario = { id: 1, tipo: 'PF', get: function() { return this } };
  const defaultPerfil = { id: 2, nome: 'Produtor', get: function() { return this } };

  let emailDAO = null;
  
  beforeEach(() => {
    emailDAO = new EmailDAO(models);
  });

  it('#getCredenciais deveria retornar as credenciais do usuario', (done) => {
    const credenciais = { email: 'usuario@mail.com', senha: 'd3f41tp455w0rd' };

    td.when(models.Email.findOne({ where: { email: credenciais.email } })).thenResolve(defaultEmail);
    td.when(models.Usuario.findOne({ where: { id: defaultEmail.usuario } })).thenResolve(defaultUsuario);
    td.when(models.Credencial.findOne({ where: { email: defaultEmail.id } })).thenResolve(defaultCredencial);
    td.when(models.Perfil.findOne({ where: { id: defaultCredencial.perfil } })).thenResolve(defaultPerfil);

    emailDAO
      .getCredenciais(credenciais)
      .then((payload) => {
        expect(payload.data.email).to.be.eql(defaultEmail.email);
        expect(payload.data.usuario.tipo).to.be.eql(defaultUsuario.tipo);
        expect(payload.data.perfil.nome).to.be.eql(defaultPerfil.nome);
        done();
      });
  });
});
