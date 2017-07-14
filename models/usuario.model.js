var bcrypt = require('bcrypt-nodejs');

var MODEL_NAME = 'Usuario';
var Pessoa = null;
var Perfil = null;

function usuarioModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pessoa: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: Pessoa }
    },
    login: {
      type: DataType.STRING(45),
      allowNull: false,
      validate: { notEmpty: true }
    },
    senha: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = {
    tableName: 'usuario',
    hooks: {
      beforeCreate: function (usuario) {
        var salt = bcrypt.genSaltSync();
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
      }
    }
  };
  var Usuario = sequelize.define(MODEL_NAME, constructor, configs);

  return Usuario
}

module.exports = function (models) {
  Pessoa = models.Pessoa;
  Perfil = models.Perfil;

  return { name: MODEL_NAME, constructor: usuarioModel };
};
