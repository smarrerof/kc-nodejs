'use strict';

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
  name: String,
  isSale: Boolean,
  price: Number,
  photo: String,
  tags: [String]
});

adSchema.statics.findAll = function (callback) {
   Ad.find({}, callback);
};

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;