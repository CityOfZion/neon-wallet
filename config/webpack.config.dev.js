'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  target: 'electron',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(__dirname, '..', 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '..', 'app/dist/'),
    filename: 'bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    __dirname: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: true,
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  performance: {
    hints: false
  }
}
