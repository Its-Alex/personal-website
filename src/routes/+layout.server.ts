import type { ServerLoad } from '@sveltejs/kit'

import { locales, loadTranslations, translations, defaultLocale } from '$lib/translations'

export const load: ServerLoad = async ({ url, cookies, request }) => {
  const { pathname } = url

  let locale: string = url.searchParams.has('queryLanguage')
    ? (url.searchParams.get('queryLanguage') ?? '')
    : ''

  if (locale === '') {
    // Try to get the locale from cookie
    locale = (cookies.get('lang') ?? '').toLowerCase()
  }

  // Get user preferred locale
  if (locale === '') {
    // If no cookie is set, try to determine the locale from the 'Accept-Language' header
    const acceptLanguageHeader = request.headers.get('accept-language') ?? ''
    // Attempt to match the language code with optional region code
    let match = /^[a-z]+(?=[-_])/i.exec(acceptLanguageHeader)
    // If no match is found, try to match just the language code
    if (match === null) {
      match = /^[a-z]+/i.exec(acceptLanguageHeader)
    }

    // If a match is found, use it as the locale
    locale = match !== null && match[0].length > 0 ? match[0].toLowerCase() : ''
  }

  // Use defaultLocale if locale is not supported
  const supportedLocales = locales.get().map((l) => l.toLowerCase())
  if (!supportedLocales.includes(locale.toLocaleLowerCase())) {
    locale = defaultLocale
  }

  await loadTranslations(locale, pathname)

  return {
    i18n: { locale, route: pathname },
    translations: translations.get()
  }
}
