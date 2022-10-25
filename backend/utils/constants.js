const NOT_FOUND = 404;
const UNAUTHORIZED_ERROR = 403;
const REGISTERED_ERROR = 409;
const INCORRECT_DATA = 400;
const SERVER_ERROR = 500;

const regexpLink = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/;

module.exports = {
  NOT_FOUND,
  INCORRECT_DATA,
  SERVER_ERROR,
  regexpLink,
  REGISTERED_ERROR,
  UNAUTHORIZED_ERROR,
};
