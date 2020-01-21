import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import TranslationEN from '../translations/en/translation.json'
import TranslationFR from '../translations/fr/translation.json'
import TranslationLinkEN from '../translations/en/link.json'
import TranslationLinkFR from '../translations/fr/link.json'

const resources = {
  en: {
    translation: TranslationEN,
    link: TranslationLinkEN
  },
  fr: {
    translation: TranslationFR,
    link: TranslationLinkFR
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    ns: ['translation', 'link'],
    defaultNs: 'translation',
    defaultLng: 'en',
    lngs: ['en', 'fr'],
    fallbackLng: 'fr',
    nsSeparator: '|',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
