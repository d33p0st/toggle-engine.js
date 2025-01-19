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

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/dark-mode.js',
    format: 'iife',
    name: 'darkMode'
  },

};

export default config;