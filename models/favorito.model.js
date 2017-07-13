var MODEL_NAME = 'Favorito';
var Pessoa = null;

function favoritoModel(sequelize, DataType) {
  var constructor = {
    pessoa: { 
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: Pessoa }
    },
    favoritado: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: Pessoa }
    }
  };
  var configs = { tableName: 'favorito' };
  var Favorito = sequelize.define(MODEL_NAME, constructor, configs);
  
  return Favorito;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;

  return { name: MODEL_NAME, constructor: favoritoModel };
};
