// @flow
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = process.env.PORT || 3000
const publicPath = process.env.START_HOT ? `http://localhost:${port}/dist` : ''
const { spawn } = require('child_process')
const paths = require('./paths')

const commonLoaders = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  cssModules: {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      importLoaders: 1,
    },
  },
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  target: 'electron-renderer',
  entry: [
    'babel-polyfill',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '..', 'app/index.js'),
  ],
  externals: {
    'node-hid': 'require("node-hid")',
    usb: 'require("usb")',
  },
  output: {
    path: path.join(__dirname, '..', 'app/dist/'),
    filename: 'bundle.js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: paths.alias,
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: true,
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.IgnorePlugin(/vertx/),
  ],
  module: {
    rules: [
      // Must be added to support syntax used in several of the wallet
      // connect dependencies => https://github.com/WalletConnect/walletconnect-monorepo/issues/1349
      {
        test: /@?(@walletconnect).*\.(ts|js)x?$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: 'defaults' }]],
        },
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.global\.css$/,
        use: ['style-loader', commonLoaders.css],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: ['style-loader', commonLoaders.cssModules],
      },
      {
        test: /\.global\.scss$/,
        use: ['style-loader', commonLoaders.css, 'sass-loader'],
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: ['style-loader', commonLoaders.cssModules, 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader'],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, '../app/assets/nep5/svg'),
        ],
      },
      {
        test: /\.(svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        include: [path.resolve(__dirname, '../app/assets/nep5/svg')],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.(ttf|eot|otf|wav)(\?[a-z0-9#=&.]+)?$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
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
      poll: 100,
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    before() {
      if (process.env.START_HOT) {
        spawn('npm', ['run', 'start-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError))
      }
    },
  },
  performance: {
    hints: false,
  },
}
