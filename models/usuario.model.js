var MODEL_NAME = 'Usuario';
var tableName  = 'usuario';

var Email      = null;
var Telefone   = null;
var Endereco   = null;
var Favorito   = null;
var Credencial = null;
var UsuarioProduto    = null
var PessoaFisica      = null;
var PessoaJuridica    = null;
var DocumentoCadastro = null;

function constructModel(sequelize, DataType) {
  var constructor = {
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
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  Model.hasOne(PessoaFisica,      { foreignKey: tableName });
  Model.hasOne(PessoaJuridica,    { foreignKey: tableName });
  Model.hasOne(Credencial,        { foreignKey: tableName });
  Model.hasOne(DocumentoCadastro, { foreignKey: tableName });

  Model.hasMany(Telefone,       { foreignKey: tableName });
  Model.hasMany(Endereco,       { foreignKey: tableName });
  Model.hasMany(Email,          { foreignKey: tableName });
  Model.hasMany(UsuarioProduto, { foreignKey: tableName });
  Model.hasMany(Favorito,       { foreignKey: tableName });
  Model.hasMany(Favorito,       { foreignKey: 'favoritado' });

  return Model;
}

module.exports = function (models) {
  Email      = models.Email;
  Telefone   = models.Telefone;
  Endereco   = models.Endereco;
  Usuario    = models.Usuario;
  Favorito   = models.Favorito;
  Credencial = models.Credencial;
  UsuarioProduto    = models.UsuarioProduto;
  PessoaFisica      = models.PessoaFisica;
  PessoaJuridica    = models.PessoaJuridica;
  DocumentoCadastro = models.DocumentoCadastro;
  
  return { name: MODEL_NAME, constructor: constructModel };
};
