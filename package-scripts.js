const npsUtils = require('nps-utils');
const path = require('path');

const getDevCmd = project => `NODE_ENV="development" babel \
--config-file "${path.resolve(__dirname)}/packages/${project}/.babelrc.js" \
--src-type module \
--out-dir "packages/${project}/dist" \
--ignore "packages/${project}/src/**/*.test.js" \
--extensions ".js,.jsx,.ts,.tsx" \
--watch \
"packages/${project}/src"`;

const getTypeCommand = project =>
  `cd packages/${project}; NODE_ENV="production" tsc -p "./tsconfig.json"`;

// const getBuildCmd = project => `NODE_ENV="production" babel \
// "packages/${project}/src" \
// --config-file="packages/${project}/.babelrc.js"
// --src-type module \
// --out-dir "packages/${project}/dist" \
// --ignore "packages/${project}/src/**/*.test.js" \
// --watch`;

const getLintCmd = project => `eslint --config .eslintrc.js packages/${project}/src`;

module.exports = {
  // @todo expand these scripts
  scripts: {
    lint: {
      all: npsUtils.concurrent.nps(
        'lint.helpers',
        'lint.field',
        'lint.form',
        'lint.slider',
        'lint.extra-fields',
      ),
      helpers: getLintCmd('helpers'),
      field: getLintCmd('field'),
      form: getLintCmd('form'),
      slider: getLintCmd('slider'),
      example: getLintCmd('example'),
      'extra-fields': getLintCmd('extra-fields'),
    },
    dev: {
      all: npsUtils.concurrent.nps(
        'dev.helpers',
        'dev.form',
        'dev.field',
        'dev.extra-fields',
        'dev.slider',
        'dev.example',
      ),
      helpers: getDevCmd('helpers'),
      form: getDevCmd('form'),
      field: getDevCmd('field'),
      'extra-fields': getDevCmd('extra-fields'),
      slider: getDevCmd('slider'),
      example: 'cd packages/example && yarn run dev',
    },
    type: {
      all: npsUtils.concurrent.nps('type.helpers'),
      helpers: getTypeCommand('helpers'),
    },
  },
};
