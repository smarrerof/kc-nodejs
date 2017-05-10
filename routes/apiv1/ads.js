'use strict';

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Ad = require('../../models/ad');

/* Ads endpoint */
router.get('/', function(req, res) {
  // res.setHeader('Content-Type', 'application/json');
  // res.send({ ad: 1 });

  mongoose.connect('mongodb://localhost/nodepop', {}, function(error) {
    // Check error in initial connection
    if (error) {
      return res.status(500).send({ error: 'something blew up'+error }); 
    }

    Ad.findAll((err, data) => {
      if (error) {
        return res.status(500).send({ error: 'something blew up' }); 
      }
      res.setHeader('Content-Type', 'application/json');
      return res.send(data);
    });
  });
});

module.exports = router;