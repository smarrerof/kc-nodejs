'use strict';

var express = require('express');
var router = express.Router();

/* Users endpoint */
router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({ user: 1 });
});

module.exports = router;