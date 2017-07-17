var bcrypt = require('bcrypt-nodejs');

var MODEL_NAME = 'Credencial';
var tableName = 'credencial';

var Email = null;

function constructModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: Email }
    },
    senha: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = {
    tableName: tableName,
    hooks: {
      beforeCreate: function (usuario) {
        var salt = bcrypt.genSaltSync();
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
      }
    }
  };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  Email = models.Email;

  return { name: MODEL_NAME, constructor: constructModel };
};
