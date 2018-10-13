const webpack = require('webpack')
const path = require('path')

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      },
      'sass-loader'
    ],
    include: path.resolve(__dirname, '../')
  })

  storybookBaseConfig.resolve = {
    ...storybookBaseConfig.resolve,
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, '../app/assets'),
      styles: path.resolve(__dirname, '../app/styles'),
      components: path.resolve(__dirname, '../app/components')
    }
  }

  return storybookBaseConfig
}
