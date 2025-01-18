// rollup.config.js
import terser from '@rollup/plugin-terser'; // Correctly import the terser plugin

export default {
  input: 'src/index.js',  // Entry file
  output: {
    file: 'dist/dark-mode.min.js',  // Output minified file
    format: 'iife',  // Immediately Invoked Function Expression (IIFE) for browser compatibility
    name: 'enableDarkMode',  // Name of the global variable if needed in the browser
  },
  plugins: [
    terser()  // Correct usage of the terser plugin for minification
  ]
};