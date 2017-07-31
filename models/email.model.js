module.exports = (sequelize, DataType) => {
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
      unique: true,
      validate: { notEmpty: true }
    }
  };
  const configs = { tableName: 'email' };
  const Model = sequelize.define('Email', constructor, configs);

  Model.associate = (models) => {
    Model.hasOne(models.Credencial);
    Model.belongsTo(models.Usuario);
  };

  return Model;
}
