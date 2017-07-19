const PerfilService = require('../../../static/scripts/src/services/perfil.service');

describe('PerfilService', () => {
  const defaultPerfil = {
    id: 2,
    nome: 'Produtor'
  };
  const $http = {
    get: td.function(),
    post: td.function(),
    put: td.function(),
    delete: td.function()
  };
  let perfilService = null;

  beforeEach(() => {
    perfilService = new PerfilService($http);
  });

  it('#getAvailable deveria retornar a lista de perfis disponíveis para cadastro', (done) => {
    td.when($http.get('/perfil/disponivel')).thenResolve({ data: [ defaultPerfil ] });
    perfilService
      .getAvailable()
      .then((perfis) => {
        expect(perfis[0].nome).to.be.eql(defaultPerfil.nome);
        done();
      });
  })
});
