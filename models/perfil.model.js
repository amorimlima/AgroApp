module.exports = (sequelize, DataType) => {
  const constructor = {
    id:   {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING(45),
      allowNull: false,
      validate: { notEmpty: true }
    }

  };
  const configs = { tableName: 'perfil' };
  const Model = sequelize.define('Perfil', constructor, configs);

  Model.associate = (models) => {
    Model.hasMany(models.Usuario, { foreignKey: 'Perfil', as: 'Usuarios' });
  };

  return Model;
};
