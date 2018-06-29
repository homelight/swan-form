import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import camelCase from 'lodash/camelCase';

const packages = ['slider', 'field', 'form', 'helpers'];

const config = pkg => {
  /* eslint-disable */
  const pkgJSON = require(`packages/${pkg}/package.json`);
  /* eslint-enable */
  return {
    input: `packages/${pkg}/src/index.js`,
    output: {
      name: camelCase(`swanForm-${pkg}`),
      file: `packages/${pkg}/${pkgJSON.main}`,
      format: 'commonjs',
    },
    plugins: [resolve(), commonjs()],
  };
};

export default [...packages.map(config)];
