const path = require('path')

const resolveApp = subPath => path.resolve(__dirname, '../app/', subPath)

module.exports = {
  alias: {
    assets: resolveApp('assets'),
    styles: resolveApp('styles'),
    components: resolveApp('components'),
    'node:crypto': path.resolve(__dirname, '../node_modules/crypto-browserify'),
  },
}
