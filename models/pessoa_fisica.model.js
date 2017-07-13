var MODEL_NAME = 'PessoaFisica';
var Pessoa = null;

function pessoaFisicaModel(sequelize, DataType) {
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
      type: DataType.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = { tableName: 'pessoa_fisica' };
  var PessoaFisica = sequelize.define(MODEL_NAME, constructor, configs);

  PessoaFisica.hasOne(Pessoa, { foreignKey: 'pessoa_fisica' });

  return PessoaFisica;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;

  return { name: MODEL_NAME, constructor: pessoaFisicaModel };
};
