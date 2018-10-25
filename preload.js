/* eslint-disable */
const _process = process
process.once('loaded', function() {
  global.process = _process
  global.require = require
  global.Buffer = Buffer
})
