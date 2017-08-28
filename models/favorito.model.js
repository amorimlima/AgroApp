module.exports = (sequelize, DataType) => {
  const constructor = {};
  const configs = { tableName: 'favorito' };
  const Model = sequelize.define('Favorito', constructor, configs);

  Model.associate = (models) => {
    Model.belongsTo(models.Usuario, { foreignKey: 'Usuario', as: 'Seguidor' });
    Model.belongsTo(models.Usuario, { foreignKey: 'Favorito', as: 'Favoritado' });
  };

  return Model;
};
