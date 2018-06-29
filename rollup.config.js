import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import camelCase from 'lodash/camelCase';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';

const packages = ['helpers', 'field', 'slider', 'form'];
// NOTE: if we add other formats, we need to change the `config` function
const formats = ['cjs', 'es'];

const babelConfig = require('./babel.config');

const config = (pkg, format) => {
  /* eslint-disable */
  const pkgJSON = require(path.resolve(__dirname, `packages/${pkg}/package.json`));
  /* eslint-enable */
  return {
    input: `packages/${pkg}/src/index.js`,
    output: {
      name: camelCase(`swanForm-${pkg}`),
      file:
        format === 'cjs' ? `packages/${pkg}/${pkgJSON.main}` : `packages/${pkg}/${pkgJSON.module}`,
      format,
      globals: {
        react: 'React',
      },
      exports: 'named',
      sourcemap: true,
    },
    external: [
      '@swan-form/helpers',
      '@swan-form/field',
      '@swan-form/form',
      '@swan-form/slider',
      'react',
      'prop-types',
    ],
    plugins: [
      resolve({
        browser: true,
        main: true,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Fragment',
            'Children',
            'createElement',
          ],
        },
      }),
      babel(babelConfig()),
      format === 'cjs' ? uglify() : terser(),
      filesize(),
    ].filter(Boolean),
  };
};

const configs = packages.reduce(
  (acc, pkg) => [...acc, ...formats.map(format => config(pkg, format))],
  [],
);

export default [...configs];
