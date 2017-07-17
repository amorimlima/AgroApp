const HttpStatus = require('http-status');

describe('Integrações Usuario', () => {
  const defaultPF = { id: 1, tipo: 'PF' };
  const defaultPJ = { id: 2, tipo: 'PJ' };
  const Usuario = app.get('models').Usuario;

  beforeEach((done) => {
    Usuario
      .destroy({ where: {}, force: true })
      .then(() => {
        Usuario
          .create(defaultPF)
          .then(() => done());
      });
  });
  
  it('deveria registrar um novo usuario', (done) => {
    request
      .post('/')
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(res.body.tipo).to.be.eql(defaultPF.tipo);
        done();
      });
  });
});
