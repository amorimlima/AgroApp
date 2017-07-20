const MODEL_NAME = 'Endereco';
const tableName = 'endereco';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataType.STRING(9),
      validate: { notEmpty: true }
    },
    logradouro: {
      type: DataType.STRING,
      validate: { notEmpty: true }
    },
    numero: {
      type: DataType.INTEGER
    },
    complemento: {
      type: DataType.STRING(30),
      validate: { notEmpty: true }
    },
    bairro: {
      type: DataType.STRING(45),
      validate: { notEmpty: true }
    },
    cidade: {
      type: DataType.STRING(45),
      allowNull: false,
      validate: { notEmpty: true }
    },
    estado: {
      type: DataType.STRING(2),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);;
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
