const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const findCacheDir = require('find-cache-dir');
const clamp = require('lodash/clamp');
const os = require('os');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function filter(arr) {
  return arr.filter(Boolean);
}

const happyThreadPool = HappyPack.ThreadPool({ size: clamp(os.cpus().length, 5, 1) });

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
    filename: '[name].js',
    chunkFilename: '[name]-[contenthash].js',
    publicPath: '/',
  };

  config.devtool = 'eval';

  config.module = {};
  config.module.rules = filter([
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: filter([
            ['@babel/preset-env', { loose: true }],
            ['@babel/preset-react', { development: isDev }],
            ['@babel/preset-stage-0', { decoratorsLegacy: true }],
          ]),
          plugins: filter([
            ifProd('transform-react-remove-prop-types'),
            'react-hot-loader/babel',
            // 'transform-decorators-legacy',
            // 'syntax-decorators',
            'lodash',
          ]),
        },
      },
    },
    ifProd(
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
      },
    ),
    ifProd(
      {
        test: /src\/index\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /src\/index\.scss$/,
        use: 'happypack/loader?id=globalScss',
      },
    ),
    ifProd(
      {
        test: /\.scss$/,
        exclude: /node_modules|src\/index\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // Dev
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=scss',
      },
    ),
  ]);

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1337,
  };

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.js$/,
          name: 'common',
          chunks: 'all',
          minChunks: 5,
        },
        // css: {
        //   test: /\.(css|sass|scss)$/,
        //   name: 'common',
        //   chunks: 'all',
        //   minChunks: 2,
        // },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
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
            sourceMaps: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMaps: true,
          },
        },
      ],
    ),
    createHappyPackPlugin(
      'css',
      // https://github.com/amireh/happypack/issues/183
      [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMaps: true,
          },
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
            localIdentName: '[name]__[local]___[hash:base64:5]',
            importLoaders: 2,
            sourceMaps: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMaps: true,
          },
        },
      ],
    ),
    new CaseSensitivePathsWebpackPlugin(),
    ifProd(new webpack.optimize.SplitChunksPlugin()),
    ifProd(new webpack.optimize.ModuleConcatenationPlugin()),
    ifProd(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name]-[contenthash].css',
        chunkFilename: '[name]-[contenthash].css',
      }),
    ),
  ]);

  return config;
}

module.exports = factory(process.env.NODE_ENV, process.env.ANALYZE);
