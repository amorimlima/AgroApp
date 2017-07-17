const HttpStatus = require('http-status');

const GenericDAO = require('../../../dao').GenericDAO;

describe('GenericDAO', () => {
  const Model = {
    create:   td.function(),
    findById: td.function(),
    findAll:  td.function(),
    update:   td.function(),
    destroy:  td.function()
  };

  const defaultModel = {
    id: 1,
    campo_texto: 'Texto',
    campo_numero: 450,
  };
  let genericDAO = null;

  beforeEach(() => genericDAO = new GenericDAO(Model));


  it('deveria criar um novo modelo', (done) => {
      const payload = { campo_texto: 'Text', campo_numero: 450 };
      
      td.when(Model.create(payload)).thenResolve(defaultModel);

      genericDAO
        .create(payload)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data.campo_texto).to.be.eql(defaultModel.campo_texto);
          expect(response.data.campo_numero).to.be.eql(defaultModel.campo_numero);
          done();
        });
  });

  it('deveria retornar um modelo com o id fornecido', (done) => {
    const id = 1;

    td.when(Model.findById(id)).thenResolve(defaultModel);

    genericDAO
      .getById(id)
      .then((response) => {
        expect(response.statusCode).to.be.eql(HttpStatus.OK);
        expect(response.data.campo_texto).to.be.eql(defaultModel.campo_texto);
        expect(response.data.campo_numero).to.be.eql(defaultModel.campo_numero);
        done();
      });
  });

  it('deveria retornar todos os modelos cadastrados', (done) => {
    td.when(Model.findAll()).thenResolve([defaultModel]);

    genericDAO
      .getAll()
      .then((response) => {
        expect(response.statusCode).to.be.eql(HttpStatus.OK);
        expect(response.data[0].campo_texto).to.be.eql(defaultModel.campo_texto);
        expect(response.data[0].campo_numero).to.be.eql(defaultModel.campo_numero);
        done();
      });
  });

  it('deveria atualizar o modelo com o id fornecido', (done) => {
    const id = 1;
    const payload = {
      campo_texto: 'Texto atualizado',
      campo_numero: 451
    };

    td.when(Model.update(payload, { where: { id } })).thenResolve(1);
    td.when(Model.findById(id)).thenResolve(payload);

    genericDAO
      .update(payload, id)
      .then((response) => {
        expect(response.statusCode).to.be.eql(HttpStatus.OK);
        expect(response.data.campo_texto).to.be.eql(payload.campo_texto);
        expect(response.data.campo_numero).to.be.eql(payload.campo_numero);
        done();
      })
  });
  
  it('deveria remover o modelo com o id fornecido', (done) => {
    const id = 1;

    td.when(Model.destroy({ where: { id } })).thenResolve([1]);

    genericDAO
      .delete(id)
      .then((response) => {
        expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT);
        done();
      });
  });
});