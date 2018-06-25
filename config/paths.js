// @flow
const path = require('path')

const resolveApp = (subPath: string) =>
  path.resolve(__dirname, '../app/', subPath)

module.exports = {
  alias: {
    styles: resolveApp('styles'),
    components: resolveApp('components')
  }
}
