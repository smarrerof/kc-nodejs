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
  mongoose.model('Ad').find(filters, callback)     
    .skip(options.start)
    .limit(options.limit);
};

adSchema.statics.findByFilterCount = function (filters, options, callback) {
  mongoose.model('Ad').find(filters).count(callback);
};

mongoose.model('Ad', adSchema);