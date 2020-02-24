const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Webpack = require('webpack');
const port = 3001;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: '/',
    hot: true,
    port,
    inline: true
  }
});
