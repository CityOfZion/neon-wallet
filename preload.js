/* eslint-disable */
const _process = process
const crypto = require('crypto-browserify');
process.once('loaded', function() {
  global.process = _process
  global.require = require
  global.Buffer = Buffer
  global.crypto = crypto
})
