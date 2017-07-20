const MODEL_NAME = 'Email';
const tableName = 'email';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: { 
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);;
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
