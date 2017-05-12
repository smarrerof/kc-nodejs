'use strict';

const mongoose = require('mongoose');
const config = require('./config');

// To fix promise warning
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
  console.log('MongoDB: Connection error', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB: Connected to', config.db.url);
});

mongoose.connect(config.db.url);