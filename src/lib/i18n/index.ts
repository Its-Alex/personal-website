// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'

register('en', async () => await import('./locales/en.json'))
register('fr', async () => await import('./locales/fr.json'))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale
}).catch(err => { console.error(err) })
