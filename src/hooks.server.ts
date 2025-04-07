import type { Handle } from '@sveltejs/kit'
import { createHighlighterCore, type HighlighterGeneric } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

import { locales, loadTranslations, defaultLocale } from '$lib/translations'

const highlighter = (await createHighlighterCore({
  themes: [import('@shikijs/themes/dracula')],
  langs: [
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/svelte'),
    import('@shikijs/langs/terraform'),
    import('@shikijs/langs/dockerfile'),
    import('@shikijs/langs/shell'),
    import('@shikijs/langs/toml')
  ],
  engine: createOnigurumaEngine(() => import('shiki/wasm'))
})) as HighlighterGeneric<string, string>

const getLocaleFromUrlCookiesOrHeader = (
  url: URL,
  langCookie: string,
  acceptLanguageHeader: string
): string => {
  let locale: string = url.searchParams.has('queryLanguage')
    ? (url.searchParams.get('queryLanguage') ?? '')
    : ''

  if (locale === '') {
    // Try to get the locale from cookie
    locale = (langCookie ?? '').toLowerCase()
  }

  // Get user preferred locale
  if (locale === '') {
    // If no cookie is set, try to determine the locale from the 'Accept-Language' header
    acceptLanguageHeader = acceptLanguageHeader ?? ''
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

  return locale
}

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies, request } = event

  const locale = getLocaleFromUrlCookiesOrHeader(
    url,
    cookies.get('lang') ?? '',
    request.headers.get('accept-language') ?? ''
  )

  await loadTranslations(locale, url.pathname)

  event.locals.locale = locale
  event.locals.highlighter = highlighter

  const response = await resolve(event)
  return response
}
