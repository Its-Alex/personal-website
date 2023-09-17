import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import postcssNesting from 'postcss-nesting'

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  },
  plugins: [sveltekit()]
})
