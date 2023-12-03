import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import autoprefixer from 'autoprefixer'

const config = {
  plugins: [
    tailwindcssNesting(),
    // Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),
    // But others, like autoprefixer, need to run after,
    autoprefixer
  ]
}

export default config
