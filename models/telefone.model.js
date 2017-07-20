const MODEL_NAME = 'Telefone';
const tableName = 'telefone';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ddd: {
      type: DataType.INTEGER(2),
      allowNull: false,
      validate: { is: /\d{2}/ }
    },
    numero: {
      type: DataType.INTEGER(9),
      allowNull: false,
      validate: { is: /(\d{8}|\d{9})/ }
    }
  };
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
