'use strict';

const jwt = require('jsonwebtoken');
const config = require('./config');
const i18n = require('../locales/i18n');

/**
 * Genera un token firmado incluyendo el payload.
 * 
 * @param {any} payload 
 * @returns {string} token
 * 
 */
function sign(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}


/**
 * Middleware para verificar si el token incluido en la petición es
 * correcto o no
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 * @returns 
 * 
 */
function verify(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const error = i18n.translate('Unauthorized');

  if (!token) {
    return res.status(401).json({status: false, error: error});
  }

  jwt.verify(token, config.jwt.secret, function(err, decoded) {      
    if (err) {
      return res.status(401).json({status: false, error: error});
    } 
    
    req.decoded = decoded;    
    next();
  });
}

module.exports = {
  sign: sign,
  verify: verify
};