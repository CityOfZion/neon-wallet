'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const commonLoaders = {
  cssModules: {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1
    }
  }
}

module.exports = {
  bail: true,
  devtool: false,
  target: 'electron-main',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '..', 'app/index.js')
  ],
  externals: {
    'node-hid': 'require("node-hid")',
    'ledger-node-js-api': 'require("ledger-node-js-api")'
  },
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: true,
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.global\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            commonLoaders.cssModules
          ]
        })
      },
      {
        test: /\.global\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            commonLoaders.cssModules,
            'resolve-url-loader',
            'sass-loader'
          ]
        })
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
