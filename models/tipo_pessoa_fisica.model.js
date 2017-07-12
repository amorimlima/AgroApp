var MODEL_NAME = 'TipoPessoaFisica';
var PessoaFisica = null;

function tipoPessoaFisicaModel(sequelize, DataType) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { tableName: 'tipo_pessoa_fisica' };
  var TipoPessoaFisica = sequelize.define(MODEL_NAME, constructor, configs);

  TipoPessoaFisica.hasMany(PessoaFisica);

  return TipoPessoaFisica;
}

module.exports = function (models) {
  PessoaFisica = models.PessoaFisica;
  return { name: MODEL_NAME, constructor: tipoPessoaFisicaModel };
};
