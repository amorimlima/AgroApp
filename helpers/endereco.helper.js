'use strict';
const stringHelper = require('./string.helper');

exports.getEnderecoCompleto = (Endereco, sanitized = false) => {
  const formatado = `${Endereco.logradouro}, ${Endereco.numero}`
  + (Endereco.complemento ? `, ${Endereco.complemento}` : '')
  + ` - ${Endereco.bairro}, ${Endereco.cidade} - ${Endereco.estado}`
  + `, ${Endereco.cep.slice(0, 5)}-${Endereco.cep.slice(5)}`;
  
  return (sanitized ? stringHelper.sanitize(formatado) : formatado);
}
