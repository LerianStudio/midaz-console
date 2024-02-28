var en = require('./translations.en.json')
var pt_BR = require('./translations.pt-br.json')

const i18n = {
  translations: {
    pt_BR,
    en
  },
  defaultLang: 'pt_BR',
  useBrowserDefault: true,
  languageDataStore: 'query' || 'localStorage'
}

module.exports = i18n
