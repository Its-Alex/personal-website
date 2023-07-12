import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0]

  if ((event?.url?.searchParams?.get('queryLanguage') ?? false) === true) {
    locale.set(event?.url?.searchParams?.get('queryLanguage'))
      .catch(err => { console.error(err) })
  } else if ((lang ?? '') !== '') {
    locale.set(lang)
      .catch(err => { console.error(err) })
  }

  return await resolve(event)
}
