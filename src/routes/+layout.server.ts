import type { ServerLoad } from '@sveltejs/kit'

import { translations } from '$lib/translations'

export const load: ServerLoad = async ({ locals, url }) => {
  const { pathname } = url

  return {
    i18n: { locale: locals.locale, route: pathname },
    translations: translations.get()
  }
}
