const MODEL_NAME = 'Usuario';
const tableName  = 'usuario';

let Email      = null;
let Telefone   = null;
let Endereco   = null;
let Favorito   = null;
let Credencial = null;
let UsuarioProduto    = null
let PessoaFisica      = null;
let PessoaJuridica    = null;
let DocumentoCadastro = null;

const constructModel = (sequelize, DataType) => {
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
  const configs = { tableName };
  const Model = sequelize.define(MODEL_NAME, constructor, configs);

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

module.exports = (models) => {
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
