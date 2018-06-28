/* eslint-disable */
function env(modules, browsers) {
  return ['@babel/preset-env', { targets: { browsers: browsers || ['ie 11', '>1%'] }, modules }];
}

module.exports = function(api) {
  const { NODE_ENV } = process.env;
  const isProd = NODE_ENV === 'production';
  const isTest = NODE_ENV === 'test' || NODE_ENV === 'ci';
  // const isDev = !isProd && !isTest;

  api.cache(true);

  const presets = [env(NODE_ENV === 'test' ? 'commonjs' : false), '@babel/preset-typescript', '@babel/preset-react'];

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    isProd && 'transform-react-remove-prop-types',
    isProd && 'transform-es2015-modules-commonjs',
  ].filter(Boolean);

  const ignore = [isProd && '**/*.test.*', isProd && '**/__tests__/**/*', '**/dist/**/*'].filter(Boolean);

  return { presets, plugins, ignore };
};
