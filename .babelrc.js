module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: ['IE 11', '>1%'],
        modules: false,
      },
    ],
    '@babel/stage-0',
    '@babel/react',
  ],
  env: {
    production: {
      ignore: ['**/*.test.js'],
      plugins: ['transform-react-remove-prop-types', 'transform-es2015-modules-commonjs'],
      presets: [
        [
          '@babel/env',
          {
            targets: ['IE 11', '>1%'],
            modules: false,
          },
        ],
        '@babel/stage-0',
        '@babel/react',
      ],
    },
    test: {
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
          },
        ],
        '@babel/stage-0',
        '@babel/react',
      ],
    },
  },
};
