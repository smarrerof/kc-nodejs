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
    filters.tags = { $all: req.query.tag };
  }

  // sale filter
  if (req.query.sale) {
    if (req.query.sale === 'true') {
      filters.sale = true;
    } else if (req.query.sale === 'false') {
      filters.sale = false;
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
      if (!isNaN(parseInt(prices[0]))) {
        filters.price = Object.assign({'$gte': parseInt(prices[0])}, filters.price);
      }
      
      if (!isNaN(parseInt(prices[1]))) {
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

  // Include total option
  options.includeTotal = req.query.includeTotal === 'true';

  mongoose.model('Ad').findByFilter(filters, options, (err, ads) => {
    if (err) {
      return next(err);
    }

    if (!options.includeTotal) {
      return res.json({success: true, result: {ads: ads}});
    }

    mongoose.model('Ad').findByFilterCount(filters, options, (err, total) => {
      if (err) {
        return next(err);
      }

      return res.json({success: true, result: {
        ads: ads,
        total: total
      }});
    });    
  });
});

/* GET /apiv1/ads/tags */
router.get('/tags', jwt.verify, (req, res, next) => {
  mongoose.model('Ad').distinct('tags', (err, tags) => {
    if (err) {
        return next(err);
    }
     return res.json({success: true, result: {tags: tags}});
  });

});

module.exports = router;