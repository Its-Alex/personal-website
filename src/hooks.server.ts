import type { HandleServerError } from '@sveltejs/kit/hooks'

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

export { handle } from '#lib/translations/index.js'
