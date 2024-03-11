var en = require('./translations.en.json')
var pt = require('./translations.pt.json')

const i18n = {
  translations: {
    pt,
    en
  },
  defaultLang: 'pt',
  useBrowserDefault: false,
  languageDataStore: 'query' || 'localStorage'
}

module.exports = i18n
