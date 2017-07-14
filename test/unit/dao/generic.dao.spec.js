var GenericDAO = require('../../../dao').GenericDAO;

describe('GenericDAO', function () {
  var Model = {
    create:   td.function(),
    findById: td.function(),
    findAll:  td.function(),
    update:   td.function(),
    destroy:  td.function()
  };

  var defaultModel = {
    id: 1,
    campo_texto: 'Texto',
    campo_numero: 450,
  };
  var genericDAO = null;

  beforeEach(function() {
    genericDAO = new GenericDAO(Model);
  });


  it('deveria criar um novo modelo', function (done) {
      var payload = { campo_texto: 'Text', campo_numero: 450 };
      
      td.when(Model.create(payload)).thenResolve(defaultModel);

      genericDAO
        .create(payload)
        .then(function (model) {
          expect(model.campo_texto).to.be.eql(defaultModel.campo_texto);
          expect(model.campo_numero).to.be.eql(defaultModel.campo_numero);
          done();
        });
  });

  it('deveria retornar um modelo com o id fornecido', function (done) {
    var id = 1;

    td.when(Model.findById(id)).thenResolve(defaultModel);

    genericDAO
      .getById(id)
      .then(function (model) {
        expect(model.campo_texto).to.be.eql(defaultModel.campo_texto);
        expect(model.campo_numero).to.be.eql(defaultModel.campo_numero);
        done();
      });
  });

  it('deveria retornar todos os modelos cadastrados', function (done) {
    td.when(Model.findAll()).thenResolve([defaultModel]);

    genericDAO
      .getAll()
      .then(function (models) {
        expect(models[0].campo_texto).to.be.eql(defaultModel.campo_texto);
        expect(models[0].campo_numero).to.be.eql(defaultModel.campo_numero);
        done();
      });
  });

  it('deveria atualizar o modelo com o id fornecido', function (done) {
    var id = 1;
    var payload = {
      campo_texto: 'Texto atualizado',
      campo_numero: 451
    };

    td.when(Model.update(payload, { where: { id } })).thenResolve(1);

    genericDAO
      .update(payload, id)
      .then(function (rows) {
        expect(rows).to.be.eql(1);
        done();
      })
  });
  
  it('deveria remover o modelo com o id fornecido', function (done) {
    var id = 1;

    td.when(Model.destroy({ where: { id } })).thenResolve([1]);

    genericDAO
      .delete(id)
      .then(function (rows) {
        expect(rows).to.be.eql([1]);
        done();
      });
  });
});