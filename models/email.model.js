var MODEL_NAME = 'Email';
var tableName = 'email';

function constructModel(sequelize, DataType) {
  var constructor = {
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
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
}
