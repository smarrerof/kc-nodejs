'use strict';

var express = require('express');
const mongoose = require('mongoose');
const jwt = require('../../lib/jwt');

var router = express.Router();


/* GET /apiv1/users */ 
router.get('/', jwt.verify, function(req, res, next) {
  mongoose.model('User').find({}, (err, users) => {
    if (err) {
      next(err);
    }

    return res.json({success: true, users: users});
  })
});


/* POST /apiv1/users/authenticate */
router.post('/authenticate', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status('400').send('BadRequest');
  }

  console.log(req.body.email, req.body.password);

  mongoose.model('User').authenticate(req.body.email, req.body.password, (err, user) => {
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