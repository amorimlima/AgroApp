var Usuario = require('./usuario.model');
var Perfil = require('./perfil.model');
var PessoaFisica = require('./pessoa_fisica.model');
var PessoaJuridica = require('./pessoa_juridica.model');
var TipoPessoaFisica = require('./tipo_pessoa_fisica.model');
var TipoPessoaJuridica = require('./tipo_pessoa_juridica.model');

module.exports = [
  Usuario,
  Perfil,
  PessoaFisica,
  PessoaJuridica,
  TipoPessoaFisica,
  TipoPessoaJuridica
];
