'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = process.env.PORT || 3000
const publicPath = process.env.START_HOT ? `http://localhost:${port}/dist` : ''
const { spawn } = require('child_process')

const commonLoaders = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  cssModules: {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  }
}

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  target: 'electron-renderer',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '..', 'app/index.js')
  ],
  externals: {
    'node-hid': 'require("node-hid")',
    'ledger-node-js-api': 'require("ledger-node-js-api")'
  },
  output: {
    path: path.join(__dirname, '..', 'app/dist/'),
    filename: 'bundle.js',
    publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      styles: path.resolve(__dirname, '../app/styles')
    }
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
        test: /\.global\.css$/,
        use: [
          'style-loader',
          commonLoaders.css
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          'style-loader',
          commonLoaders.cssModules
        ]
      },
      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          commonLoaders.css,
          'sass-loader'
        ]
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          'style-loader',
          commonLoaders.cssModules,
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
  // adapted from https://github.com/chentsulin/electron-react-boilerplate
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, '..', 'app/dist/'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before () {
      if (process.env.START_HOT) {
        spawn(
          'npm',
          ['run', 'start-dev'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError))
      }
    }
  },
  performance: {
    hints: false
  }
}
