const HttpStatus = require('http-status');

const generic = (data, statusCode = HttpStatus.OK) => ({ data, statusCode });
const error = (errorMessage, statusCode = HttpStatus.UNPROCESSABLE_ENTITY) => {
  return generic({ message: errorMessage }, statusCode);
};

module.exports = {
  generic,
  error
};
