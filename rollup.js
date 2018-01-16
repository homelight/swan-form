const rollup = require('rollup');

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify');
const { minify } = require('uglify-es');
const autoprefixer = require('autoprefixer');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pkg = require('./package.json');
const extra = glob.sync('src/components/*.js').concat(glob.sync('src/components/Fields/*.js'));

const plugins = name => [
  postcss({
    extract: `dist/${name}.css`,
    plugins: [
      autoprefixer({
        grid: true,
        remove: false,
        flexbox: 'no-2009',
      }),
    ],
  }),
  babel({
    exclude: 'node_modules/**',
    externalHelpers: false,
  }),
  resolve(),
  commonjs(),
  filesize(),
];

const minifyCJS = uglify();
const minfiyES = uglify({}, minify);

const inputOptions = (file, format, minify = false) => ({
  input: file,
  external: extra.concat(Object.keys(pkg.peerDependencies)).filter(f => f !== file),
  plugins: minify
    ? plugins(path.basename(file, '.js')).concat(format === 'es' ? [minfiyES] : [minifyCJS])
    : plugins(path.basename(file, '.js')),
});

const outputOptions = (name, format, min) => ({
  file:
    format === 'es'
      ? `dist/${path.basename(name, '.js')}.es${min ? '.min' : ''}.js`
      : `dist/${path.basename(name, '.js')}${min ? '.min' : ''}.js`,
  format,
  sourcemap: true,
});

async function build(file, format, min) {
  const input = inputOptions(file, format, min);
  const output = outputOptions(file, format, min);
  // create a bundle
  const bundle = await rollup.rollup(input);

  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  // const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(output);
}

const mini = [true, false];
const formats = ['cjs', 'es'];
const files = ['src/index.js'].concat(extra);

files.forEach(file => mini.forEach(m => formats.forEach(format => build(file, format, m))));
