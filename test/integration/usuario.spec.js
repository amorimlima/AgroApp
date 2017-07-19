const HttpStatus = require('http-status');

describe('Integrações Usuario', () => {
  const Usuario = app.get('models').Usuario;
  const PessoaFisica = app.get('models').PessoaFisica;
  const PessoaJuridica = app.get('models').PessoaFisica;
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
  const telefone = { id: 1, ddd: 11, numero: 22334455 };
  let idUsuario = null;

  beforeEach((done) => {
    Usuario
      .destroy({ where: {}, force: true })
      .then(() => {
        Usuario
          .create(usuarioPF)
          .then(() => {
            PessoaFisica
              .destroy({ where: {}, force: true })
              .then(() => {
                PessoaJuridica
                  .destroy({ where: {}, force: true })
                  .then(() => done());
              });
          });
      });
  });
  
  it('POST: /usuario/registro/credencial deveria registrar um novo usuario', (done) => {
    const payload = {
      usuario: { tipo: 'PF' },
      email: { email: 'user@mail.com' },
      credencial: { perfil: 1, senha: 'd3f4u1tp455w0rd' }
    };

    request
      .post('/usuario/registro/credencial')
      .send(payload)
      .end((err, res) => {
        const usuario = res.body;
        idUsuario = usuario.id;

        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(usuario.tipo).to.be.eql(usuarioPF.tipo);
        expect(usuario.email.usuario).to.be.eql(usuario.id);
        expect(usuario.email.email).to.be.eql(email.email);
        expect(usuario.credencial.usuario).to.be.eql(usuario.id);
        expect(usuario.credencial.email).to.be.eql(usuario.email.id);
        done();
      });
  });

  it('POST: /usuario/registro/dados-pessoais deveria salvar os dados pessoais do novo usuario', (done) => {
    const payload = {
      usuario: { tipo_pessoa: 'PF' },
      pessoa_fisica: {
        cpf: 22233366638,
        usuario: 1,
        rg: '376892407',
        nome: 'Usuario',
        sobrenome: 'de Teste',
        data_nascimento: '1988-03-04'
      },
      telefone: { usuario: 1, tipo: 1, ddd: 11, numero: 22334455 }
    };

    request
      .post('/usuario/registro/dados-pessoais')
      .send(payload)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(res.body.pessoa_fisica.cpf).to.be.eql(PF.cpf);
        expect(res.body.pessoa_fisica.usuario).to.be.eql(usuarioPF.id);
        expect(res.body.pessoa_fisica.rg).to.be.eql(PF.rg);
        expect(res.body.pessoa_fisica.nome).to.be.eql(PF.nome);
        expect(res.body.pessoa_fisica.sobrenome).to.be.eql(PF.sobrenome);
        expect(res.body.pessoa_fisica.data_nascimento).to.be.eql(PF.data_nascimento);
        expect(res.body.telefone.usuario).to.be.eql(usuarioPF.id);
        expect(res.body.telefone.ddd).to.be.eql(telefone.ddd);
        expect(res.body.telefone.numero).to.be.eql(telefone.numero);
        done();
      });
  })
});
