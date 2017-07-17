var MODEL_NAME = 'PessoaFisica';
var tableName = 'pessoa_fisica';

function constructModel(sequelize, DataType) {
  var constructor = {
    cpf: {
      type: DataType.INTEGER(11), 
      primaryKey: true, 
      allowNull: false, 
      validate: { is: /\d{11}/ } 
    },
    rg: {
      type: DataType.STRING(9),
      allowNull: false,
      validate: { notEmtpy: true }
    },
    nome: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    sobrenome: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_nascimento: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
};
