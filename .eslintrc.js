module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/jsx-filename-extension': 0,
  },
};
