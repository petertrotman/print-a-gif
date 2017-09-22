const path = require('path');

const config = {
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'PrintAGif',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      },
    ],
  },
  devtool: 'source-map',
};

module.exports = config;
