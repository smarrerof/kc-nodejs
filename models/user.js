'use strict';

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: String
});

userSchema.statics.authenticate = function(email, password, callback) {
  mongoose.model('User').findOne({email: email}, (err, user) => {
    if (err) {
      return callback(err);
    }

    if (!user || user.password !== password) {
      return callback(null, null);
    }

    callback(null, user);
  });    
  
};

mongoose.model('User', userSchema);