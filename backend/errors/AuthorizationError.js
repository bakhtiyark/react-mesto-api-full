// Erreur 401

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RestrictedAccess';
    this.statusCode = 401;
  }
}
module.exports = AuthorizationError;
