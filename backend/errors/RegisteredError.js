// Erreur 409

class RegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RegisteredError';
    this.statusCode = 409;
  }
}
module.exports = RegisteredError;
