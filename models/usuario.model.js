module.exports = (sequelize, DataType) => {
  const bcrypt = require('bcrypt-nodejs');
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataType.ENUM('PF', 'PJ'),
      allowNull: false,
      validate: { notEmpty: true }
    },
    senha: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  const configs = {
    tableName: 'usuario',
    hooks: {
      beforeCreate: function (usuario) {
        const salt = bcrypt.genSaltSync();
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
      }
    }
  };
  const Model = sequelize.define('Usuario', constructor, configs);

  Model.associate = (models) => {
    Model.hasOne(models.PessoaFisica,      { foreignKey: 'Usuario', as: 'PessoaFisica' });
    Model.hasOne(models.PessoaJuridica,    { foreignKey: 'Usuario', as: 'PessoaJuridica' });
    Model.hasOne(models.DocumentoCadastro, { foreignKey: 'Usuario', as: 'DocumentoCadastro' });

    Model.hasMany(models.Telefone,       { foreignKey: 'Usuario', as: 'Telefones' });
    Model.hasMany(models.Endereco,       { foreignKey: 'Usuario', as: 'Enderecos' });
    Model.hasMany(models.Email,          { foreignKey: 'Usuario', as: 'Emails' });
    Model.hasMany(models.UsuarioProduto, { foreignKey: 'Usuario', as: 'Produtos' });
    Model.hasMany(models.Favorito,       { foreignKey: 'Usuario', as: 'Pessoas' });
    Model.hasMany(models.Favorito,       { foreignKey: 'Favorito', as: 'Favoritos' });
  };
  
  return Model;
};
