var MODEL_NAME = 'Pessoa';
var Telefone = null;
var Endereco = null;
var Email = null;
var Usuario = null;
var PessoaFisica = null;
var PessoaJuridica = null;
var Favorito = null;
var DocumentoCadastro = null;


function pessoaModel(sequelize, DataType) {
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
  var configs = { tableName: 'pessoa' }
  var Pessoa = sequelize.define(MODEL_NAME, constructor, configs);

  Pessoa.hasMany(Telefone, { foreignKey: 'pessoa' });
  Pessoa.hasMany(Endereco, { foreignKey: 'pessoa' });
  Pessoa.hasMany(Email, { foreignKey: 'pessoa' });
  Pessoa.hasMany(Usuario, { foreignKey: 'pessoa' });
  Pessoa.hasMany(PessoaFisica, { foreignKey: 'pessoa' });
  Pessoa.hasMany(PessoaJuridica, { foreignKey: 'pessoa' });
  Pessoa.hasMany(PessoaJuridica, { foreignKey: 'pessoa' });
  Pessoa.hasMany(Favorito, { foreignKey: 'pessoa' });
  Pessoa.hasMany(Favorito, { foreignKey: 'favoritado' });
  Pessoa.hasOne(DocumentoCadastro, { foreignKey: 'pessoa' });

  return Pessoa;
}

module.exports = function (models) {
  
  return { name: MODEL_NAME, constructor: pessoaModel };
};
