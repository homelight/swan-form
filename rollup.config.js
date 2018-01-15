import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  sourcemap: true,
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    postcss({}),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    filesize(),
  ],
};
