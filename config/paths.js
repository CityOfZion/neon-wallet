const path = require('path')

const resolveApp = subPath => path.resolve(__dirname, '../app/', subPath)

module.exports = {
  alias: {
    styles: resolveApp('styles'),
    components: resolveApp('components')
  }
}
