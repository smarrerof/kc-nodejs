'use strict';

const translations = require('./translations.json');

function translate(key, language) {
  language = language || 'en';
  let dictionary = translations[language];
  if (!dictionary) {
    if (language === 'en' || !translations.en) {
      return key;
    }
    dictionary = translations.en;
  }

  if (!dictionary[key])
    return key;
  
  return dictionary[key];
}

module.exports = { translate: translate };