import { createHighlighter } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { Highlighter } from 'shiki'
export { default as rehypeShikiFromHighlighter } from '@shikijs/rehype/core'

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['dracula'],
      langs: [],
      engine: createJavaScriptRegexEngine()
    })
  }
  return highlighterPromise
}
