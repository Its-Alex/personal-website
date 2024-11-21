import I18n from 'sveltekit-i18n'
import type { Config } from 'sveltekit-i18n'

const config: Config = {
  fallbackLocale: 'en',
  fallbackValue: 'en',
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./locales/en.json')).default
    },
    {
      locale: 'fr',
      key: 'common',
      loader: async () => (await import('./locales/fr.json')).default
    }
  ]
}

export const defaultLocale = 'en'
export const {
  t,
  loading,
  locales,
  locale,
  translations,
  loadTranslations,
  addTranslations,
  setLocale,
  setRoute
} = new I18n(config)
