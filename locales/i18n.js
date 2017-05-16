'use strict';

const translations = require('./translations.json');

const defaultLanguage = 'en';
let requestLanguage;

function configure(req, res, next) {
  requestLanguage = req.headers.language;  
  next();
}

function translate(key, language) {
  language = language || requestLanguage || defaultLanguage;
  console.log('tranlate to', language);
  let dictionary = translations[language];
  if (!dictionary) {
    if (language === defaultLanguage || !translations[defaultLanguage]) {
      return key;
    }
    dictionary = translations[defaultLanguage];
  }

  if (!dictionary[key])
    return key;
  
  return dictionary[key];
}

module.exports = {
  configure: configure,
  translate: translate 
};