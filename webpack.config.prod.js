const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map', // recommended prod source map
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // URL context path to index.html page in dist
    filename: 'bundle.js' // name of bundle files
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // allow omit of extensions when importing
  },
  plugins: [
    // display bundle stats
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // with hash filename changes only when css changes so users won't have to re-download
    }),

    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify('http://localhost:3001')
    }),

    // generates our index.html and adds ref to javascript/css bundle into index.html dynamically
    new HtmlWebpackPlugin({
      favicon: './src/favicon2.ico',
      template: 'src/index.html',
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortcutDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
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
        use: [
          /** NOTE: Loaders run BOTTOM-UP 
           * 
           * postcss-loader --> css-loader
           *
           */
          MiniCssExtractPlugin.loader,    // extracts our css to diff file using css-loader below
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { 
            loader: "postcss-loader",     // cssnano plugin minifies our css
            options: {
              plugins: () => [require('cssnano')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
