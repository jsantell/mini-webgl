var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'mini3d.js',
    libraryTarget: 'var',
    library: 'Mini',
  },
  module: {
    rules: [
      { test: /\.js/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.(vs|fs)$/, exclude: /node_modules/, use: ['raw-loader', 'glslify-loader'] },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  watch: true,
};
