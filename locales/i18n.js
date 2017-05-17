'use strict';

const translations = require('./translations.json');

// Idioma usado por defecto si no se obtiene una traducción para 
// la key/language usados en el método translate
const defaultLanguage = 'en';
let requestLanguage;


/**
 * Configura el módulo extrayendo el idioma del header del request.
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function configure(req, res, next) {
  requestLanguage = req.headers.language;  
  next();
}


/**
 * Obtiene una traducción para un idioma dado.
 * Si no se pasa un idioma, se usa el idioma obtenido de la request. Si
 * tampoco hay idioma en el request se usa defaultLanguage. Si no se obtiene
 * una traducción para el par key/language se trata de obtener una traducción
 * para el par key/defaultLanguage. Si esto también falla se devuelve la key
 * como traducción.
 * 
 * @param {any} key 
 * @param {any} language 
 * @returns {string} translation
 */
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