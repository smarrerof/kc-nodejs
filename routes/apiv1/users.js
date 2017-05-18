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
     const error = i18n.translate('AddUser_RequireFields');
     return res.status('400').json({status: false, error: error});
  }

  if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(body.email)) {
    const error = i18n.translate('AddUser_EmailIncorrect');
    return res.status('400').json({status: false, error: error});
  }

  const sha256 = crypto.createHash('sha256').update(body.password).digest('base64');
  const user = {name: body.name, email: body.email, password: sha256};

  mongoose.model('User').create(user, (err, userCreated) => {
    if (err) {
      if (err.code === 11000) {
        // Email duplicado en la base de datos
        const error = i18n.translate('AddUser_EmailExists');
        return res.status('400').json({status: false, error: error});
      }
      return next(err);
    }
    // Por seguridad, borramos el password del objeto creado
    userCreated.password = '';
    return res.json({success: true, result: {user: userCreated}});
  });
});

/* POST /apiv1/users/authenticate */
router.post('/authenticate', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    const error = i18n.translate('AuthenticateUser_Failed');
    return res.status('401').json({status: false, error: error});
  }
  
  const sha256 = crypto.createHash('sha256').update(req.body.password).digest('base64');

  mongoose.model('User').authenticate(req.body.email, sha256, (err, user) => {
    if (err) {
      next(err);
    }

    if (!user) {      
      const error = i18n.translate('AuthenticateUser_Failed');
      return res.status('401').json({status: false, error: error});
    }

    const token = jwt.sign({id: user.id});

    return res.json({success: true, result: token});
  });
});

module.exports = router;