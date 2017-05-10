'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');

const mongoose = require('mongoose');
const Ad = require('../models/ad');
const User = require('../models/user');


mongoose.connect('mongodb://localhost/nodepop', {}, function(error) {
  // Check error in initial connection
  if (error) {
    return console.log('Error', error);    
  }

  const fileName = path.join('./install', 'anuncios.json');
  fs.readFile(fileName, (err, data) => {    
    if (err) {
      return console.log('Error fs.readFile', err);
    }

    try {    
      var json = JSON.parse(data);

      async.parallel({    
        initAds: async.reflect(initAds.bind(null, json.ads)),
        initUsers: async.reflect(initUsers.bind(null, json.users))
      }, (err, results) => {
        if (err) {
          return console.log('Error async.parallel', err);
        }
        displayResult(results);
        mongoose.connection.close((err) => {
          if (err) {
            return console.log('Error mongoose.connection.close', err);
          }
          process.exit();
        });
        
      });   
    } catch (err) {
      return console.log('Error', err);
    }
  });  
});


function initAds(ads, callback) {
  Ad.remove({}, (err) => {
    if (err) {
      callback(err);
    }

    Ad.collection.insertMany(ads, (err, data) => {
      if (err) {
        callback(err);
      }
      callback(null, data.insertedCount);
    });
  });  
}

function initUsers(users, callback) {
  User.remove({}, (err) => {
    if (err) {
      callback(err);
    }

    User.collection.insertMany(users, (err, data) => {
      if (err) {
        callback(err);
      }
      callback(null, data.insertedCount);
    });
  });  
}

function displayResult(results) {
  Object.keys(results).forEach((key) => {
    const result = results[key];
    const tableName = key.replace('init', '');

    if (result.value) {
      console.log(tableName, 'ends correctly,', result.value, 'rows affected');
    } else if (result.error) {
      console.log(tableName, 'ends with errors,', result.error);
    } else {
      console.log(tableName, 'there is no information available');
    }
  });
}