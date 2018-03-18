const npsUtils = require('nps-utils');

const getDevCmd = project =>
  `babel --src-type module "packages/${project}/src" --out-dir "packages/${project}/dist" --ignore "packages/${project}/src/**/*.test.js" --watch`;

module.exports = {
  // @todo expand these scripts
  scripts: {
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
      example: 'cd packages/example && yarn start',
    },
  },
};
