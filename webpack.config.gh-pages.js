const path = require('path');

const config = {
  entry: './src/web.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'web.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }],
          ],
        },
      },
    ],
  },
  devtool: 'source-map',
};

module.exports = config;
