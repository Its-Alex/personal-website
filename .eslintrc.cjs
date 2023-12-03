module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
  overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
      extends: 'standard-with-typescript',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		{
			files: ['*.js', '*.jsx'],
			extends: 'standard',
		},
    {
      files: ['*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      }
    }
	]
};
