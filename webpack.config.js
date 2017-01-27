const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const baseConfig = {
  context: resolve(__dirname, 'src'),
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/print-a-gif/dist/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer],
            },
          },
        ],
      },
    ],
  },

  plugins: [],
};

const devConfig = Object.assign({}, baseConfig, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ].concat(baseConfig.entry),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname),
    publicPath: '/print-a-gif/dist/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ].concat(baseConfig.plugins),
});

const prodConfig = Object.assign({}, baseConfig, {
});

module.exports =
  process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;
