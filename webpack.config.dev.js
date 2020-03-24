const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // URL context path to index.html page in dist
    filename: 'bundle.js' // name of bundle files
  },
  devServer: {
    overlay: true,
    open: true,
    openPage: '', // should end in /because it is PRE-pended on other endpoints
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // allow omit of extensions when importing
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3001')
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon2.ico',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
