const HttpStatus = require('http-status');

describe('Integrações Usuario', () => {
  const usuarioPF = { id: 1, tipo: 'PF' };
  const usuarioPJ = { id: 2, tipo: 'PJ' };
  const PF = {
    cpf: 22233366638,
    usuario: 1,
    rg: '376892407',
    nome: 'Usuario',
    sobrenome: 'de Teste',
    data_nascimento: '1988-03-04'
  };
  const PJ = {
    cpnj: 24377411000169,
    usuario: 2,
    razao_social: 'Empresa de Teste LTDA',
    responsavel: 'Responsável de Teste',
    data_fundacao: '1994-04-16'
  };
  const email = { id: 1, usuario: 1, email: 'user@mail.com' }
  const credencial = { id: 1, usuario: 1, perfil: 1, email: 1, senha: 'd3f4u1tp455w0rd' };
  const Usuario = app.get('models').Usuario;

  beforeEach((done) => {
    Usuario
      .destroy({ where: {}, force: true })
      .then(() => {
        Usuario
          .create(usuarioPF)
          .then(() => done());
      });
  });
  
  it('POST: /usuario/register deveria registrar um novo usuario', (done) => {
    const payload = {
      usuario: { tipo: 'PF' },
      email: { email: 'user@mail.com' },
      credencial: { perfil: 1, senha: 'd3f4u1tp455w0rd' }
    };

    request
      .post('/usuario/register')
      .send(payload)
      .end((err, res) => {
        const usuario = res.body;

        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(usuario.tipo).to.be.eql(usuarioPF.tipo);
        expect(usuario.email.usuario).to.be.eql(usuario.id);
        expect(usuario.email.email).to.be.eql(email.email);
        expect(usuario.credencial.usuario).to.be.eql(usuario.id);
        expect(usuario.credencial.email).to.be.eql(usuario.email.id);
        done();
      });
  });
});
