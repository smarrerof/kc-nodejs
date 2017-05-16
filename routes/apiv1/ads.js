'use strict';

var express = require('express');
const mongoose = require('mongoose');
const jwt = require('../../lib/jwt');

var router = express.Router();


/* GET /apiv1/ads */
router.get('/', jwt.verify, (req, res, next) => {
  // Parse filters (field filters)
  let filters = {};
  // Tag filter
  if (req.query.tag) {
    filters.tags = req.query.tag;
  }

  // IsSale filter
  if (req.query.sale) {
    if (req.query.sale === 'true') {
      filters.isSale = true;
    } else if (req.query.sale === 'false') {
      filters.isSale = false;
    }
  }

  // Name filter
  if (req.query.name) {
    filters.name = new RegExp('^'+ req.query.name, 'i');
  }

  // Price filter
  if (req.query.price) {
    var prices = req.query.price.split('-');
    if (prices.length == 2) {
      filters.price = {};
      if (prices[0] !== '') {
        filters.price = Object.assign({'$gte': parseInt(prices[0])}, filters.price);
      }
      if (prices[1] !== '') {
        filters.price = Object.assign({'$lte': parseInt(prices[1])}, filters.price);
      }
    }
  }

  // Parse options (paging, sorting...)
  let options = {};
  // Start option -> pageIndex
  if (req.query.start) {
    options.start = parseInt(req.query.start);
  }

  // Limit option -> pageSize
  if (req.query.limit) {
     options.limit = parseInt(req.query.limit);
  }

  mongoose.model('Ad').findByFilter(filters, options, (err, result) => {
    if (err) {
        return next(err);
    }

    return res.json({success: true, result: result});
  });
});

/* GET /apiv1/ads/tags */
router.get('/tags', (req, res, next) => {

  mongoose.model('Ad').distinct('tags', (err, result) => {
    if (err) {
        return next(err);
    }
     return res.json({success: true, result: result});
  });

});

module.exports = router;