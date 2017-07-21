const HttpStatus = require('http-status');
const jwt = require('jwt-simple');

describe('Integrações Produto', () => {
  const Produto = app.get('models').Produto;
  const Usuario = app.get('models').Usuario;
  const Email = app.get('models').Email;
  const Credencial = app.get('models').Credencial;
  const UsuarioProduto = app.get('models').UsuarioProduto;
  let usuario = {};
  let token = '';

  before((done) => {
    UsuarioProduto
      .destroy({ where: {}, force: true })
      .then(() => Credencial.destroy({ where: {}, force: true }))
      .then(() => Email.destroy({ where: {}, force: true }))
      .then(() => Usuario.destroy({ where: {}, force: true }))
      .then(() => Usuario.create({ id: 1, tipo: 'PF' }))
      .then(() => Email.create({ id: 1, email: 'usuario@mail.com' }))
      .then(() => Credencial.create({ usuario: 1, perfil: 2, email: 1, senha: 'd3f4u1tp455w0rd' }))
      .then(() => UsuarioProduto.create({
        usuario: 1,
        produto: 1,
        unidade: 'kg',
        quantidade: 5000,
        data_inicio: '2017-07-19',
        data_fim: '2018-07-19'
      }))
      .then(() => {
        token = jwt.encode({ usuario: 1, perfil: 2, tipo: 'PF' }, app.get('configs').jwt.secret);
        done();
      });
  });

  it('POST /produto/oferta deveria cadastrar um novo UsuarioProduto', (done) => {
    const payload = {
      usuario: 1,
      produto: 1,
      unidade: 'kg',
      quantidade: 5000,
      data_inicio: '2017-04-21',
      data_fim: '2017-09-14'
    };

    request
      .post('/produto/oferta')
      //.set('Authorization',  `JWT ${token}`)
      .send(payload)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(res.body.usuario).to.be.eql(payload.usuario);
        expect(res.body.produto).to.be.eql(payload.produto);
        expect(res.body.unidade).to.be.eql(payload.unidade);
        expect(res.body.quantidade).to.be.eql(payload.quantidade);
        expect(res.body.data_inicio).to.be.eql(payload.data_inicio);
        expect(res.body.data_fim).to.be.eql(payload.data_fim);
        done();
      })
  });
});
