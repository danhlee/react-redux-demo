const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js', // name of bundle files
    publicPath: '/' // URL context path to index.html page in dist
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // allow omit of extensions when importing
  },
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3001')
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon2.ico',
      template: 'src/index.html'
    })
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css'
    // })
  ]
};
