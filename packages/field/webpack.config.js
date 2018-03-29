const config = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          extends: '../../.babelrc',
          // presets: [ '@babel/env' ],
        },
      },
    ],
  },
};

if (process.env.NODE_ENV == 'production') {
  config.externals = {
    react: 'react',
    'react-dom': 'react-dom',
    '@swan-form/helpers': '@swan-form/helpers',
  };
}

module.exports = config;
