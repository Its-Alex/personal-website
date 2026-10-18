import tailwindcss from '@tailwindcss/vite'
import ssrAdapter from '@sveltejs/adapter-node'
import vercelAdapter from '@sveltejs/adapter-vercel'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte, type MdsvexOptions } from 'mdsvex'
import type { BundledLanguage } from 'shiki'
import { defineConfig } from 'vite'

import { getHighlighter } from './src/lib/highlighter.ts'

const mdsvexOptions: MdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, language) => {
      let lang = language ?? 'text'
      const hl = await getHighlighter()
      const loaded = hl.getLoadedLanguages()
      if (!loaded.includes(lang)) {
        try {
          await hl.loadLanguage(lang as BundledLanguage)
        } catch {
          lang = 'text'
        }
      }
      const html = escapeSvelte(hl.codeToHtml(code, { lang, theme: 'dracula' }))
      return `{@html \`${html}\` }`
    }
  }
}

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    tailwindcss(),
    sveltekit({
      extensions: ['.svelte', '.md'],
      preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
      adapter: process.env.VERCEL ? vercelAdapter() : ssrAdapter()
    })
  ],
  build: {
    cssCodeSplit: true
  },
  ssr: {
    noExternal: []
  }
})
