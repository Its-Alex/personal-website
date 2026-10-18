import type { Handle, HandleServerError } from '@sveltejs/kit/hooks'

import { locales, loadTranslations, defaultLocale } from '#lib/translations/index.js'
import { getHighlighter } from '#lib/highlighter.js'

export const init = async () => {
  await getHighlighter()
}

// 404s are silenced on purpose: logging them would be noisy. Request logging belongs upstream.
export const handleError: HandleServerError = (caught) => {
  const status = caught.kind === 'unknown' ? 500 : caught.error.status
  if (status === 404) return

  console.error(
    `[${status}] ${caught.event.request.method} ${caught.event.url.pathname}`,
    caught.error
  )
}

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

  const response = await resolve(event)
  return response
}
