const HttpStatus = require('http-status');

const generic = (data, statusCode = HttpStatus.OK) => ({ data: data, statusCode: statusCode });
const error = (errorMessage, statusCode = HttpStatus.UNPROCESSABLE_ENTITY) => {
  return generic({ error: errorMessage }, statusCode);
};

module.exports = {
  generic,
  error
};
