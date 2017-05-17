'use strict';

const config = {
  db: {
    url: 'mongodb://localhost/nodepop'
  },
  jwt: {
    secret: 'nodepop-secret',
    expiresIn: 86400 // one day in seconds
  }
};

module.exports = config;