var GenericDAO = require('../../../dao').GenericDAO;

describe('PessoaDAO', function () {
  var Pessoa = {
    create:   td.function(),
    findById: td.function(),
    findAll:  td.function(),
    update:   td.function(),
    destroy:  td.function()
  };

  var defaultPessoaPF = {
    id: 1,
    tipo: 'PF',
    pessoas: {}
  };
  var genericDAO = null;

  beforeEach(function() {
    genericDAO = new GenericDAO(Model);
  });

  it('deveria retornar uma pessoa com os dados pessoais (PF)');
  it('deveria retornar uma pessoa com os dados pessoais (PJ)');
});
