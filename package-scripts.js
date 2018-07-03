const npsUtils = require('nps-utils');
const path = require('path');

const getDevCmd = project => `NODE_ENV="development" babel \
--config-file "${path.resolve(__dirname)}/packages/${project}/.babelrc.js" \
--src-type module \
--out-dir "packages/${project}/dist/cjs" \
--ignore "packages/${project}/src/**/*.test.js" \
--extensions ".js,.jsx,.ts,.tsx" \
--watch \
"packages/${project}/src"`;

const getTypeCmd = project => `cd ${__dirname}/packages/${project} && yarn run type`;
const getDevTypeCmd = project => `cd ${__dirname}/packages/${project} && yarn run type --watch`;

// Old commands
// -----------
// const getBuildCmd = project => `NODE_ENV="production" babel \
// "packages/${project}/src" \
// --config-file="packages/${project}/.babelrc.js"
// --src-type module \
// --out-dir "packages/${project}/dist" \
// --ignore "packages/${project}/src/**/*.test.js" \
// --watch`;

// const getBuildCmd = project => `NODE_ENV="production" babel \
// "packages/${project}/src" \
// --config-file="packages/${project}/.babelrc.js"
// --src-type module \
// --out-dir "packages/${project}/dist/cjs" \
// --ignore "packages/${project}/src/**/*.test.js" \
// --watch`;

const getLintCmd = project => `eslint --ext .js,.jsx,.ts,.tsx --config .eslintrc.js packages/${project}/src`;

module.exports = {
  // @todo expand these scripts
  scripts: {
    lint: {
      all: npsUtils.concurrent.nps('lint.helpers', 'lint.field', 'lint.form', 'lint.slider', 'lint.extra-fields'),
      helpers: getLintCmd('helpers'),
      field: getLintCmd('field'),
      form: getLintCmd('form'),
      slider: getLintCmd('slider'),
      example: getLintCmd('example'),
      'extra-fields': getLintCmd('extra-fields'),
    },
    dev: {
      all: npsUtils.concurrent.nps(
        // 'dev.helpers',
        // 'dev.form',
        // 'dev.field',
        // 'dev.extra-fields',
        // 'dev.slider',
        'dev.rollup',
        'type.dev.all',
        'dev.example',
        // 'type.dev.helpers',
        // 'type.dev.field',
      ),
      helpers: getDevCmd('helpers'),
      form: getDevCmd('form'),
      field: getDevCmd('field'),
      'extra-fields': getDevCmd('extra-fields'),
      slider: getDevCmd('slider'),
      rollup: 'rollup -c -w',
      example: 'cd packages/example && yarn run dev',
    },
    type: {
      // prettier-ignore
      all: npsUtils.concurrent.nps(...[
        'type.helpers', 
        'type.field', 
        'type.form', 
        'type.slider',
      ]),
      dev: {
        all: npsUtils.concurrent.nps('type.dev.helpers', 'type.dev.field', 'type.dev.form', 'type.dev.slider'),
        helpers: getDevTypeCmd('helpers'),
        field: getDevTypeCmd('field'),
        form: getDevTypeCmd('form'),
        slider: getDevTypeCmd('slider'),
      },
      helpers: getTypeCmd('helpers'),
      field: getTypeCmd('field'),
      form: getTypeCmd('form'),
      slider: getTypeCmd('slider'),
    },
  },
};
