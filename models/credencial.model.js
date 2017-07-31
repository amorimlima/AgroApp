module.exports = (sequelize, DataType) => {
  const bcrypt = require('bcrypt-nodejs');
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    senha: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  const configs = {
    tableName: 'credencial',
    hooks: {
      beforeCreate: function (usuario) {
        const salt = bcrypt.genSaltSync();
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
      }
    }
  };
  const Model = sequelize.define('Credencial', constructor, configs);

  Model.associate = (models) => {
    Model.belongsTo(models.Usuario);
    Model.belongsTo(models.Email);
    Model.belongsTo(models.Perfil);
  }
  
  return Model;
}
