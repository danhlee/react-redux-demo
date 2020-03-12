const merge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    openPage: '', // should end in /because it is PRE-pended on other endpoints
    overlay: true,
    hot: true,
    historyApiFallback: true
  }
});
