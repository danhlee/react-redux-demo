const merge = require('webpack-merge')
const config = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')

process.env.NODE_ENV = "production"

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // removes all console.* during bundling process
          }
        }
      })
    ]
  }
})
