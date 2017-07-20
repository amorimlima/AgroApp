const bcrypt = require('bcrypt-nodejs');

const MODEL_NAME = 'Credencial';
const tableName = 'credencial';
let Email = null;

const constructModel = (sequelize, DataType) => {
  const constructor = {
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
  const configs = {
    tableName,
    hooks: {
      beforeCreate: function (usuario) {
        const salt = bcrypt.genSaltSync();
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
      }
    }
  };
  
  return sequelize.define(MODEL_NAME, constructor, configs);;
}

module.exports = (models) => {
  Email = models.Email;

  return { name: MODEL_NAME, constructor: constructModel };
};
