'use strict';

const config = {
  db: {
    url: 'mongodb://localhost/nodepop'
  },
  jwt: {
    secret: 'nodepop-secret',
    expiresIn: 1440 // one day in seconds
  }
};

module.exports = config;