const { resolve } = require('path');

module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  root: true,
  plugins: ['monorepo'],
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'import/extensions': 0, // this seemed to be broken, so we're turning it off
    'monorepo/no-internal-import': 'error',
    'monorepo/no-relative-import': 'error',
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: resolve(__dirname, 'packages'),
      },
    },
  },
};
