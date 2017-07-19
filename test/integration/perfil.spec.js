const HttpStatus = require('http-status');

describe('Integrações Perfil', () => {
  const Perfil = app.get('models').Perfil;
  let perfis = [];

  before((done) => {
    Perfil
      .findAll()
      .then((perfilList) => {
        perfis = perfilList
          .map(perfil => perfil.get({ plain: true }));

        done();
      });
  });

  it('GET /perfil/disponivel deveria retornar a lista de perfis disponíveis', (done) => {
    request
      .get('/perfil/disponivel')
      .end((err, res) => {  
        expect(res.statusCode).to.be.eql(HttpStatus.OK);
        expect(res.body).to.have.lengthOf(perfis.length -1)
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        done();
      });
  });
});
