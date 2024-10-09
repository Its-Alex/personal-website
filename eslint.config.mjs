// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tseslintParser from '@typescript-eslint/parser'
// import importPlugin from 'eslint-plugin-import';
import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import loveConfig from 'eslint-config-love'
import standardConfig from 'eslint-config-standard'

const config = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // importPlugin.configs.recommended,
  sveltePlugin.configs.recommended,
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte']
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        // ES2017 globals
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        // Node.js globals
        global: 'readonly',
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly'
      }
    },
    rules: {
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ]
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslintParser
      }
    },
    ...loveConfig
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    ...loveConfig
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...loveConfig,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off'
    }
  }
]

console.log(config);
console.log(loveConfig);

export default config;
