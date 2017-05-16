'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');

const mongoose = require('mongoose');
require('../lib/connectMongoose');
require('../models/Ad');
require('../models/User');



/**
 * Método encargado de gestionar el proceso de migración.
 * Si no se pasa un fichero se usar el valor por defecto ./install/db.json
 * Se lanza un proceso paralelo para cada tabla que queramos inicializar.
 * 
 * @param {string} fileName  
 * 
 */
function init(fileName) {
  fileName = fileName || path.join('./install', 'db.json');
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
}


/**
 * Metodo encargado de inicializar la colección (tabla) de anuncios (Ads)
 * La tabla Ads se vacia antes de insertar los nuevos datos.
 * 
 * @param {any} ads 
 * @param {any} callback 
 * 
 */
function initAds(ads, callback) {
  mongoose.model('Ad').remove({}, (err) => {
    if (err) {
      callback(err);
    }

    mongoose.model('Ad').collection.insertMany(ads, (err, data) => {
      if (err) {
        callback(err);
      }
      callback(null, data.insertedCount);
    });
  });  
}


/**
 * Metodo encargado de inicializar la colección (tabla) de usuarios (Users)
 * La tabla Users se vacia antes de insertar los nuevos datos.
 * 
 * @param {any} users 
 * @param {any} callback 
 * 
 */
function initUsers(users, callback) {
  mongoose.model('User').remove({}, (err) => {
    if (err) {
      callback(err);
    }

    mongoose.model('User').collection.insertMany(users, (err, data) => {
      if (err) {
        callback(err);
      }
      callback(null, data.insertedCount);
    });
  });  
}


/**
 * Muestra el resultado de la inicialización.
 * 
 * @param {any} results 
 * 
 */
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

// Arrancamos la inicialización
init(path.join('./install', 'db.json'));