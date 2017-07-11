var MODEL_NAME = 'TipoPessoaFisica';

function tipoPessoaFisicaModel(sequelize, DataType) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { tableName: 'tipo_pessoa_fisica' };
  var TipoPessoaFisica = sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = function (app) {
  return { name: MODEL_NAME, constructor: tipoPessoaFisicaModel };
};
