const HttpStatus = require('http-status');
const jwt = require('jwt-simple');

describe('Integrações Email', () => {
  const Email = app.get('models').Email;
  const Usuario = app.get('models').Usuario;
  const Perfil = app.get('models').Perfil;
  const Credencial = app.get('models').Credencial;
  const defaultEmail = {
    id: 1,
    usuario: 1,
    email: 'usuario@mail.com'
  };
  const defaultUsuario = {
    id: 1,
    tipo: 'PF'
  };
  const defaultCredencial = {
    id: 1,
    usuario: 1,
    perfil: 2,
    email: 1,
    senha: 'd3f4u1tp455w0rd'
  };
  const secret = app.get('configs').jwt.secret;
  let token = null;

  beforeEach((done) => {
    Credencial
      .destroy({ where: {}, force: true })
      .then(() => Email.destroy({ where: {}, force: true }))
      .then(() => Usuario.destroy({ where: {}, force: true }))
      .then(() => Credencial.destroy({ where: {}, force: true }))
      .then(() => Usuario.create(defaultUsuario))
      .then(() => Email.create(defaultEmail))
      .then(() => Credencial.create(defaultCredencial))
      .then(() => {
        request
          .post('/email/autenticacao')
          .send({ email: defaultEmail.email, senha: defaultCredencial.senha })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
  });
  
  it('POST /email/autenticacao deveria autenticar um usuário', (done) => {
    const payload = { email: 'usuario@mail.com', senha: 'd3f4u1tp455w0rd' };

    request
      .post('/email/autenticacao')
      .send(payload)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.OK);
        expect(res.body.token).to.be.eql(token);
        done();
      });
  });
})