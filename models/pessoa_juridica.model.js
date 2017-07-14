var MODEL_NAME = 'PessoaJuridica';
var Pessoa = null;

function pessoaJuridicaModel(sequelize, DataType) {
  var constructor = {
    cnpj: {
      type: DataType.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: { is: /\d{16}/ }
    },
    razao_social: {
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmpty: true }
    },
    responsavel:  {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_fundacao: {
      type: DataType.DATEONLY,
      allowNull: false
    }
  };
  var configs = { tableName: 'pessoa_juridica' };
  var PessoaJuridica = sequelize.define(MODEL_NAME, constructor, configs);

  return PessoaJuridica;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;

  return { name: MODEL_NAME, constructor: pessoaJuridicaModel };
};
