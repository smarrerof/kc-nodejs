'use strict';

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  sale: {
    type: Boolean,
    index: true
  },
  price: {
    type: Number,
    index: true
  },
  photo: String,
  tags: [String]
});

adSchema.statics.findByFilter = function (filters, options, callback) {
  mongoose.model('Ad').find(filters, callback)     
    .skip(options.start)
    .limit(options.limit);
};

adSchema.statics.findByFilterCount = function (filters, options, callback) {
  mongoose.model('Ad').find(filters).count(callback);
};

mongoose.model('Ad', adSchema);