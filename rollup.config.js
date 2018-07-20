import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import camelCase from 'lodash/camelCase';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packages = ['helpers', 'field', 'slider', 'form'];
// NOTE: if we add other formats, we need to change the `config` function
const formats = ['cjs', 'es'];

const babelConfig = require('./babel.config');

const config = (pkg, format) => {
  // eslint-disable-next-line
  const pkgJSON = require(path.resolve(__dirname, `packages/${pkg}/package.json`));

  return {
    input: `packages/${pkg}/src/index.ts`,
    output: {
      name: camelCase(`swanForm-${pkg}`),
      file: (fmt => {
        switch (fmt) {
          case 'types':
            return `packages/${pkg}/${pkgJSON.typings}`;
          case 'cjs':
            return `packages/${pkg}/${pkgJSON.main}`;
          case 'es':
            return `packages/${pkg}/${pkgJSON.module}`;
          default:
            throw new Error('Unrecognized type');
        }
      })(format),
      format: format === 'es' ? format : 'cjs',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
      exports: 'named',
      sourcemap: true,
    },
    external: ['@swan-form/helpers', '@swan-form/field', '@swan-form/form', '@swan-form/slider', 'react', 'prop-types'],
    plugins: [
      resolve({
        browser: true,
        main: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
        },
      }),
      babel(babelConfig()),
      format === 'es' && terser(),
      format === 'cjs' && uglify(),
      format === 'types' &&
        typescript({
          tsconfig: path.resolve(__dirname, 'packages', pkg, 'tsconfig.json'),
        }),
      filesize(),
    ].filter(Boolean),
  };
};

const configs = [
  ...packages.reduce((acc, pkg) => [...acc, ...formats.map(format => config(pkg, format))], []),
  // ...packages.map()
];

export default [...configs];
