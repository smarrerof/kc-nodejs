'use strict';

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
  name: String,
  sale: Boolean,
  price: Number,
  photo: String,
  tags: [String]
});

adSchema.statics.findByFilter = function (filters, options, callback) {
  console.log('findByFilter:filters', filters);
  console.log('findByFilter:options', options);
  mongoose.model('Ad').find(filters, callback)
    .skip(options.start * options.limit)
    .limit(options.limit);
};

mongoose.model('Ad', adSchema);