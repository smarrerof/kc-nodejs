'use strict';

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
  name: String,
  isSale: Boolean,
  price: Number,
  photo: String,
  tags: [String]
});

module.exports =  mongoose.model("Ad", adSchema);