// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import terser from '@rollup/plugin-terser';

// export default {
//     input: 'src/index.js',
//     output: [
//         {
//             file: 'dist/dark-mode.min.js',
//             format: 'iife',
//             name: 'MyLib', // Global variable name
//             plugins: [terser()]
//         },
//         {
//             file: 'dist/dark-mode.esm.js',
//             format: 'esm'
//         }
//     ],
//     plugins: [resolve(), commonjs()]
// };

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/dark-mode.js',
    format: 'cjs'
  },
  plugins: [
    commonjs({ defaultIsModuleExports: false }),
    babel({ babelHelpers: 'bundled' })
  ],
};

export default config;