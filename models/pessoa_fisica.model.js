var MODEL_NAME = 'PessoaFisica';
var Usuario = null;

function pessoaFisicaModel(sequelize, DataType) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataType.STRING(200), allowNull: false, validate: { notEmpty: true }  },
    cpf:  { type: DataType.INTEGER, primaryKey: true, validate: { is: /\d{11}/ } },
    rg:   { type: DataType.STRING(20), allowNull: false, validate: { notEmpty: true } },
    endereco: { type: DataType.STRING(200), allowNull: false, validate: { notEmpty: true } },
    bairro: { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } },
    cidade: { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } },
    estado: { type: DataType.STRING(2), allowNull: false, validate: { notEmpty: true } },
    cep:    { type: DataType.STRING(12), allowNull: false, validate: { notEmpty: true } },
    data_nascimento: { type: DataType.DATE, allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { tableName: 'pessoa_fisica' };
  var PessoaFisica = sequelize.define(MODEL_NAME, constructor, configs);

  PessoaFisica.hasMany(Usuario);

  return PessoaFisica;
}

module.exports = function (models) {
  Usuario = models.Usuario;

  return { name: MODEL_NAME, constructor: pessoaFisicaModel };
};
