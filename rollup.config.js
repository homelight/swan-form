import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
import camelCase from 'lodash/camelCase';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packages = ['helpers', 'field', 'form', 'slider'];
// NOTE: if we add other formats, we need to change the `config` function
const formats = ['cjs', 'es'];

// const babelConfig = require('./babel.config');

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
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
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
      typescript({
        tsconfig: path.resolve(__dirname, 'packages', pkg, 'tsconfig.json'),
        tsconfigOverride: { compilerOptions: { declaration: true } },
        useTsconfigDeclarationDir: false,
        // verbosity: 3,
        clean: true,
        cacheRoot: path.resolve(__dirname, '.rts2_cache'),
        rollupCommonJSResolveHack: true,
        typescript: require('typescript'), // eslint-disable-line
      }),

      // babel(babelConfig()),
      format === 'es' && terser(),
      format === 'cjs' &&
        uglify({
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
          },
          warnings: true,
          toplevel: false,
        }),

      filesize(),
    ].filter(Boolean),
  };
};

const configs = packages.reduce((acc, pkg) => [...acc, ...formats.map(format => config(pkg, format))], []);

export default configs; // [...configs];
