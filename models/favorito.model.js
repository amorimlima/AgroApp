module.exports = (sequelize, DataType) => {
  const constructor = {};
  const configs = { tableName: 'favorito' };
  const Model = sequelize.define('Favorito', constructor, configs);

  return Model;
};
