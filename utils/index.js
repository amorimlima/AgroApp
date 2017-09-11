const fillDatabase = require('./fill_database');
const responses = require('./responses');
const extractToken = require('./extract_token.middleware');
const requireAuth = require('./require_auth.middleware');

module.exports = {
  fillDatabase,
  responses,
  extractToken,
  requireAuth
};