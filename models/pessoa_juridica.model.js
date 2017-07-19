var MODEL_NAME = 'PessoaJuridica';
var tableName = 'pessoa_juridica';

function constructModel(sequelize, DataType) {
  var constructor = {
    cnpj: {
      type: DataType.BIGINT(16),
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
  var configs = { tableName: tableName };
  var PessoaJuridica = sequelize.define(MODEL_NAME, constructor, configs);

  return PessoaJuridica;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
};
