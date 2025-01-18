const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry file
  output: {
    filename: 'main.min.js',  // The output file
    path: path.resolve(__dirname, 'dist'),  // Directory for the output file
  },
  mode: 'production',  // Set mode to 'production' for minified output
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply Babel transpilation to all .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};