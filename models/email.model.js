var MODEL_NAME = 'Email';
var Pessoa = null;

function emailModel(sequelize, DataType) {
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
      validate: { notEmptY: true }
    }
  };
  var configs = { tableName: 'email' };
  var Email = sequelize.define(MODEL_NAME, constructor, configs);

  return Email;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;

  return { name: MODEL_NAME, constructor: emailModel };
}
