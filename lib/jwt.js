'use strict';

const jwt = require('jsonwebtoken');
const config = require('./config');

function sign(payload) {
  return  jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn // expires in 24 hours
  });
}

function verify(req, res, next) {
  var token = req.query.token;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, config.jwt.secret, function(err, decoded) {      
    if (err) {
      return res.status(401).send('Unauthorized');
    } 
    
    req.decoded = decoded;    
    next();
  });
}

module.exports = {
  sign: sign,
  verify: verify
};