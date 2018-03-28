const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const findCacheDir = require('find-cache-dir');
const clamp = require('lodash/clamp');
const os = require('os');

function filter(arr) {
  return arr.filter(O => O);
}

const happyThreadPool = HappyPack.ThreadPool({
  size: clamp(os.cpus().length, 5, 1),
});

const createHappyPackPlugin = (id, loaders, debug = false) =>
  new HappyPack({
    id,
    loaders,
    threadPool: happyThreadPool,
    verbose: !!debug,
  });

const createCacheLoader = (name, env) => {
  return {
    loader: 'cache-loader',
    options: {
      cacheDirectory: path.resolve(findCacheDir({ name }), env),
    },
  };
};

function factory(environment, analyze = false) {
  const env = environment === 'production' ? 'production' : 'development';
  const isProd = env === 'production';
  const isDev = !isProd;
  const execIfFunc = fn => (typeof fn === 'function' ? fn() : fn);
  const ifDev = (then, or) => (isDev ? execIfFunc(then) : execIfFunc(or));
  const ifProd = (then, or) => (isProd ? execIfFunc(then) : execIfFunc(or));

  const config = {};
  config.entry = filter([
    // ifDev('webpack-dev-server/client?http://0.0.0.0:1337'),
    // ifDev('webpack/hot/only-dev-server'),
    path.resolve(__dirname, 'src/index.js'),
  ]);
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  };

  config.devtool = 'eval';

  config.module = {};
  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // cacheDirectory: true,
          // babelrc: false,
          presets: filter([
            ['@babel/preset-env', { loose: true }],
            ['@babel/preset-react', { development: isDev }],
            // ['@babel/preset-stage-0'],
          ]),
          plugins: filter([
            ifProd('transform-react-remove-prop-types'),
            'react-hot-loader/babel',
            'transform-decorators-legacy',
            'syntax-decorators',
          ]),
        },
      },
    },
    {
      test: /src\/index\.scss$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=globalScss',
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=scss',
    },
  ];

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1337,
  };

  config.plugins = filter([
    analyze && new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
    createHappyPackPlugin(
      'globalScss',
      // https://github.com/amireh/happypack/issues/183
      [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: 'sass-loader',
          // options: {
          // Automatically import sass-resources.scss into all files
          // data: "@import 'sass-resources.scss';",
          // includePaths: [
          //   path.resolve(__dirname, "..", "assets", "stylesheets", "config"),
          // ],
          // },
        },
      ],
    ),
    createHappyPackPlugin(
      'scss',
      // https://github.com/amireh/happypack/issues/183
      [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            localIdentName: ifDev('[name]__[local]___[hash:base64:5]', '[hash:base64:5]'),
            importLoaders: 2,
          },
        },
        {
          loader: 'sass-loader',
          // options: {
          // Automatically import sass-resources.scss into all files
          // data: "@import 'sass-resources.scss';",
          // includePaths: [
          //   path.resolve(__dirname, "..", "assets", "stylesheets", "config"),
          // ],
          // },
        },
      ],
    ),
    new CaseSensitivePathsWebpackPlugin(),
  ]);

  return config;
}

module.exports = factory(process.env.NODE_ENV, process.env.ANALYZE);
