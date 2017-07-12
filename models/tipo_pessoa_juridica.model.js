var MODEL_NAME = 'TipoPessoaJuridica';
var PessoaJuridica = null;

function tipoPessoaJuridicaModel(sequelize, DataType) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { tableName: 'tipo_pessoa_juridica' };
  var TipoPessoaJuridica = sequelize.define(MODEL_NAME, constructor, configs);

  TipoPessoaJuridica.hasMany(PessoaJuridica);

  return TipoPessoaJuridica;
}

module.exports = function (models) {
  PessoaJuridica = models.PessoaJuridica;

  return { name: MODEL_NAME, constructor: tipoPessoaJuridicaModel };
};
