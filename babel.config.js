/* eslint-disable */
function env(modules, browsers) {
  return [
    '@babel/preset-env',
    { targets: { browsers: browsers || ['ie 11', '>1%'] }, modules, useBuiltIns: 'entry' },
  ];
}

module.exports = function(api) {
  const { NODE_ENV } = process.env;
  const isProd = NODE_ENV === 'production';
  const isTest = NODE_ENV === 'test' || NODE_ENV === 'ci';
  // const isDev = !isProd && !isTest;

  if (api) {
    api.cache(true);
  }

  const presets = [env(NODE_ENV === 'test' ? 'commonjs' : false), '@babel/preset-react'];

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    isProd && 'transform-react-remove-prop-types',
  ].filter(Boolean);

  // prettier-ignore
  const ignore = [
    isProd && '**/*.test.*', 
    isProd && '**/__tests__/**/*', 
    '**/dist/**/*',
  ].filter(Boolean);

  return { presets, plugins, ignore };
};
