var MODEL_NAME = 'Pessoa';

function pessoaModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataType.ENUM('PF', 'PJ'),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = { tableName: 'pessoa' }
  var Pessoa = sequelize.define(MODEL_NAME, constructor, configs);

  return Pessoa;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: pessoaModel };
};
