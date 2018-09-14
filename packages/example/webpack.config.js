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
const autoprefixer = require('autoprefixer');

function filter(arr) {
  return arr.filter(Boolean);
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: { plugins: () => [autoprefixer], sourceMap: true },
};

const hpGlobalScss = {
  test: /src\/index\.scss$/,
  use: 'happypack/loader?id=globalScss',
};

const hpScss = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: 'happypack/loader?id=scss',
};

const hpCss = {
  test: /\.css$/,
  use: 'happypack/loader?id=css',
};

const scssLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    includePaths: ['src'],
  },
};

const gloablScssLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    includePaths: ['node_modules'],
  },
};

const cssModules = {
  loader: 'css-loader',
  options: {
    modules: true,
    camelCase: true,
    localIdentName: '[hash:base64:5]',
    importLoaders: 2,
    sourceMaps: true,
  },
};

const globalCssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: true,
  },
};

const styleLoader = { loader: 'style-loader' };

const happyThreadPool = HappyPack.ThreadPool({ id: 'main-pool', size: clamp(os.cpus().length, 5, 1) });

const createHappyPackPlugin = (id, loaders, debug = false) =>
  new HappyPack({
    id,
    loaders,
    threadPool: happyThreadPool,
    verbose: !!debug,
  });

const createCacheLoader = (name, env) => ({
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(findCacheDir({ name }), env),
  },
});

function factory(environment, analyze = false) {
  const env = environment === 'production' ? 'production' : 'development';
  const isProd = env === 'production';
  const isDev = !isProd;
  const execIfFunc = fn => (typeof fn === 'function' ? fn() : fn);
  const ifDev = (then, or) => (isDev ? execIfFunc(then) : execIfFunc(or));
  const ifProd = (then, or) => (isProd ? execIfFunc(then) : execIfFunc(or));

  const config = {};
  config.entry = filter([path.resolve(__dirname, 'src/index.js')]);
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[contenthash].js',
    publicPath: ifProd('/swan-form/', '/'),
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
          presets: filter([['@babel/preset-env', { loose: true }], ['@babel/preset-react', { development: isDev }]]),
          plugins: filter([
            ifProd('transform-react-remove-prop-types'),
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            'lodash',
          ]),
        },
      },
    },
    ifProd({ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }, hpCss),
    ifProd(
      {
        test: /src\/index\.scss$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, globalCssLoader, postcssLoader, gloablScssLoader],
      },
      hpGlobalScss,
    ),
    ifProd(
      {
        test: /\.scss$/,
        exclude: /(node_modules|src\/index\.scss$)/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, cssModules, postcssLoader, scssLoader],
      },
      // Dev
      hpScss,
    ),
  ]);

  config.devServer = { contentBase: path.join(__dirname, 'dist'), compress: true, port: 1337 };

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        js: { test: /\.js$/, name: 'common', chunks: 'all', minChunks: 5 },
        // css: { test: /\.(sa|sc|c)ss$/, name: 'common', chunks: 'all', minChunks: 2 },
        styles: { name: 'styles', test: /\.(sa|sc|c)ss$/, chunks: 'all', enforce: true },
      },
    },
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { discardComments: { removeAll: true } } }),
    ],
  };

  config.plugins = filter([
    analyze && new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      // prefix: ifProd('/swan-form/', ''),
    }),

    ifDev(createHappyPackPlugin('globalScss', [styleLoader, globalCssLoader, gloablScssLoader])),
    ifDev(createHappyPackPlugin('css', [styleLoader, globalCssLoader])),
    ifDev(
      createHappyPackPlugin('scss', [
        styleLoader,
        { ...cssModules, localIdentName: '[name]__[local]___[hash:base64:5]' },
        { loader: 'sass-loader', options: { sourceMaps: true } },
      ]),
    ),
    new CaseSensitivePathsWebpackPlugin(),
    ifProd(new webpack.optimize.SplitChunksPlugin()),
    ifProd(new webpack.optimize.ModuleConcatenationPlugin()),
    ifProd(
      new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css', chunkFilename: '[name]-[contenthash].css' }),
    ),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': ifProd(JSON.stringify('/swan-form/', '/')),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: ifProd('"production"', '"development"'),
      },
    }),
  ]);

  return config;
}

module.exports = factory(process.env.NODE_ENV, !!process.env.ANALYZE);
