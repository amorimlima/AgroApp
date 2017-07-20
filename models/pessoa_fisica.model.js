const MODEL_NAME = 'PessoaFisica';
const tableName = 'pessoa_fisica';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    cpf: {
      type: DataType.BIGINT(11), 
      primaryKey: true, 
      allowNull: false, 
      validate: { is: /\d{11}/ } 
    },
    rg: {
      type: DataType.STRING(9),
      allowNull: false,
      validate: { notEmpty: true }
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
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
