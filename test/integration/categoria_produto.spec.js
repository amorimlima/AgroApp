const HttpStatus = require('http-status');
const Base64 = require('Base64');

describe('Integrações CategoriaProduto', () => {
  const CategoriaProduto = app.get('models').CategoriaProduto;
  const defaultCategoria = {
    id: 1,
    nome: 'Legumes e Verduras'
  };
  let categorias = [];

  before((done) => {
    CategoriaProduto
      .findAll()
      .then((categoriaList) => {
        categorias = categoriaList
          .map(categoria => categoria.get({ plain: true }));
        
        done();
      })
  });

  it('GET /categoria deveria retornar a lista de categorias', (done) => {
    request
      .get('/categoria')
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.OK);
        expect(res.body).to.have.lengthOf(categorias.length);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        done();
      });
  });
});
