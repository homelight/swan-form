const { resolve } = require('path');

module.exports = {
  extends: ['airbnb', 'prettier'],
  // parser: 'babel-eslint',
  parser: 'typescript-eslint-parser',
  root: true,
  plugins: ['monorepo'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
  },
  globals: {
    document: true,
    window: true,
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'import/extensions': 0, // this seemed to be broken, so we're turning it off
    'monorepo/no-internal-import': 'error',
    'monorepo/no-relative-import': 0,
    'import/no-extraneous-dependencies': 0, // ['error', { packageDir: './' }],
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'no-undef': 0,
    'no-restricted-globals': 0,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: resolve(__dirname, 'packages'),
      },
    },
  },
};
