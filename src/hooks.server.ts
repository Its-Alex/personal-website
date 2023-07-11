import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0]
  
  if (event?.url?.searchParams?.get('queryLanguage')) {
    locale.set(event?.url?.searchParams?.get('queryLanguage'))
  } else if (lang) {
    locale.set(lang)
  }

  return resolve(event)
}