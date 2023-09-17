// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'
let queryLanguage: string | null = null

register('en', async () => await import('./locales/en.json'))
register('fr', async () => await import('./locales/fr.json'))

if (browser) {
  const searchParams = new URL(window.location.href).searchParams

  if (searchParams?.has('queryLanguage')) {
    queryLanguage = searchParams.get('queryLanguage')
  }
}

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser
    ? queryLanguage ?? window.navigator.language
    : defaultLocale
})?.catch((err: Error) => { console.error(err) })
