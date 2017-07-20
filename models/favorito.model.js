const MODEL_NAME = 'Favorito';
const tableName = 'favorito';

const constructModel = (sequelize, DataType) => {
  const constructor = {
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
  const configs = { tableName };
  
  return sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
