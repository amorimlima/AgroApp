module.exports = (sequelize, DataType) => {
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
    }
  };
  const configs = { tableName: 'usuario' };
  const Model = sequelize.define('Usuario', constructor, configs);

  Model.associate = (models) => {
    Model.hasOne(models.PessoaFisica,      { as: 'PessoaFisica' });
    Model.hasOne(models.PessoaJuridica,    { as: 'PessoaJuridica' });
    Model.hasOne(models.Credencial,        { as: 'Credencial' });
    Model.hasOne(models.DocumentoCadastro, { as: 'DocumentoCadastro' });

    Model.hasMany(models.Telefone,       { as: 'Telefones' });
    Model.hasMany(models.Endereco,       { as: 'Enderecos' });
    Model.hasMany(models.Email,          { as: 'Emails' });
    Model.hasMany(models.UsuarioProduto, { as: 'Produtos' });
    Model.hasMany(models.Favorito,       { as: 'Pessoas' });
    Model.hasMany(models.Favorito,       { foreignKey: 'Favorito', as: 'Favoritos' });
  };
  
  return Model;
};
