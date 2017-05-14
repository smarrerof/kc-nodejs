'use strict';

var express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('../../lib/jwt');
const i18n = require('../../locales/i18n');

var router = express.Router();


/* POST /apiv1/users */ 
router.post('/', function(req, res, next) {
    const body = req.body;
  
  if (!body || !body.name || !body.email || !body.password) {
    const error = i18n.translate('BadRequest');
    return res.status('400').send(error);
  }

  const sha256 = crypto.createHash('sha256').update(body.password).digest('base64');
  const user = {name: body.name, email: body.email, password: sha256};

  mongoose.model('User').create(user, (err) => {
    console.log('User');
    if (err) {
      next(err);
    }

    return res.json({success: true});
  });
});

/* POST /apiv1/users/authenticate */
router.post('/authenticate', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status('400').send('BadRequest');
  }

  const sha256 = crypto.createHash('sha256').update(req.body.password).digest('base64');

  mongoose.model('User').authenticate(req.body.email, sha256, (err, user) => {
    if (err) {
      next(err);
    }

    if (!user) {      
      return res.json({success: false, error: 'Authentication failed.'});
    }

    const token = jwt.sign({email: user.email});

    return res.json({success: true, token: token});
  });
});

module.exports = router;