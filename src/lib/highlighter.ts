import { createHighlighterCore } from 'shiki/core'
import { bundledLanguages } from 'shiki/langs'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { HighlighterCore } from 'shiki/core'
export { default as rehypeShikiFromHighlighter } from '@shikijs/rehype/core'

let highlighter: HighlighterCore | null = null

export async function initHighlighter(): Promise<void> {
  highlighter = await createHighlighterCore({
    themes: [import('@shikijs/themes/dracula')],
    langs: Object.values(bundledLanguages),
    engine: createJavaScriptRegexEngine()
  })
}

export function getHighlighter(): HighlighterCore {
  if (!highlighter) {
    throw new Error('Highlighter not initialized. Call initHighlighter() in hooks init first.')
  }
  return highlighter
}
