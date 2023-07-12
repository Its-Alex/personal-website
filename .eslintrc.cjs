module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:svelte/recommended",
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
    commonjs: true
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser"
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      excludedFiles: 'svelte.config.js',
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
}