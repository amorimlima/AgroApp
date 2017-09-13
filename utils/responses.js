const HttpStatus = require('http-status');

exports.generic = (data, statusCode = HttpStatus.OK) => ({ data, statusCode });
exports.error = (errorMessage, statusCode = HttpStatus.UNPROCESSABLE_ENTITY) => {
  return generic({ message: errorMessage }, statusCode);
};
