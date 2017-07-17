var MODEL_NAME = 'Favorito';
var tableName = 'favorito';

function constructModel(sequelize, DataType) {
  var constructor = {
    usuario: { 
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    favoritado: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    }
  };
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);
  
  return Model;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
};
