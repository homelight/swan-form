module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie 11', '>1%'],
        },
        modules: false,
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    production: {
      ignore: ['**/*.test.js'],
      plugins: ['transform-react-remove-prop-types', 'transform-es2015-modules-commonjs'],
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['ie 11', '>1%'],
            },
            modules: false,
          },
        ],
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
        '@babel/react',
      ],
    },
  },
};
