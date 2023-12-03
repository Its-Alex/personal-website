import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0]
  const queryLng = event?.url?.searchParams?.get('queryLanguage')

  if ((queryLng ?? '') !== '') {
    locale.set(queryLng)?.catch((err: Error) => {
      console.error(err)
    })
  } else if ((lang ?? '') !== '') {
    locale.set(lang)?.catch((err: Error) => {
      console.error(err)
    })
  }

  return await resolve(event)
}
