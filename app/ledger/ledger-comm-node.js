/***************************************************************************************************************************************************************
 * Ledger Node JS API (c) 2016-2017 Ledger
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the
 * License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 **************************************************************************************************************************************************************/

var HID = require('node-hid')
var Q = require('q')

var LedgerNode = function (device, ledgerTransport, timeout, debug) {
  if (typeof timeout === 'undefined') {
    timeout = 0
  }
  this.device = device
  this.ledgerTransport = ledgerTransport
  this.timeout = timeout
  this.exchangeStack = []
  this.debug = debug
}

LedgerNode.list_async = function () {
  var devices = HID.devices()
  var deviceList = []
  for (var i in devices) {
    if (((devices[i].vendorId === 0x2581) && (devices[i].productId === 0x3b7c)) ||
         (devices[i].vendorId === 0x2c97)) {
      deviceList.push(devices[i].path)
    }
  }
  return Q.fcall(function () {
    return deviceList
  })
}

LedgerNode.prototype.exchange = function (apduHex, statusList) {
  var ledgerWrap = function (channel, command, packetSize) {
    var sequenceIdx = 0
    var offset = 0

    var tmp = Buffer.alloc(7)
    tmp.writeUInt16BE(channel, 0)
    tmp[2] = 0x05 // TAG_APDU
    tmp.writeUInt16BE(sequenceIdx, 3)
    sequenceIdx++
    tmp.writeUInt16BE(command.length, 5)
    var blockSize = (command.length > packetSize - 7 ? packetSize - 7 : command.length)
    var result = Buffer.concat([tmp, command.slice(offset, offset + blockSize)], blockSize + 7)
    offset += blockSize
    while (offset !== command.length) {
      tmp = Buffer.alloc(5)
      tmp.writeUInt16BE(channel, 0)
      tmp[2] = 0x05 // TAG_APDU
      tmp.writeUInt16BE(sequenceIdx, 3)
      sequenceIdx++
      blockSize = (command.length - offset > packetSize - 5 ? packetSize - 5 : command.length - offset)
      result = Buffer.concat([result, tmp, command.slice(offset, offset + blockSize)], result.length + blockSize + 5)
      offset += blockSize
    }
    return result
  }

  var ledgerUnwrap = function (channel, data, packetSize) {
    var offset = 0
    var responseLength
    var sequenceIdx = 0
    var response
    if ((typeof data === 'undefined') || (data.length < 7 + 5)) {
      return
    }
    if (data[offset++] !== (channel >> 8)) {
      throw new Error('Invalid channel;')
    }
    if (data[offset++] !== (channel & 0xff)) {
      throw new Error('Invalid channel')
    }
    if (data[offset++] !== 0x05) {
      throw new Error('Invalid tag')
    }
    if (data[offset++] !== 0x00) {
      throw new Error('Invalid sequence')
    }
    if (data[offset++] !== 0x00) {
      throw new Error('Invalid sequence')
    }
    responseLength = ((data[offset++] & 0xff) << 8)
    responseLength |= (data[offset++] & 0xff)
    if (data.length < 7 + responseLength) {
      return
    }
    var blockSize = (responseLength > packetSize - 7 ? packetSize - 7 : responseLength)
    response = data.slice(offset, offset + blockSize)
    offset += blockSize
    while (response.length !== responseLength) {
      sequenceIdx++
      if (offset === data.length) {
        return
      }
      if (data[offset++] !== (channel >> 8)) {
        throw new Error('Invalid channel;')
      }
      if (data[offset++] !== (channel & 0xff)) {
        throw new Error('Invalid channel')
      }
      if (data[offset++] !== 0x05) {
        throw new Error('Invalid tag')
      }
      if (data[offset++] !== (sequenceIdx >> 8)) {
        throw new Error('Invalid sequence')
      }
      if (data[offset++] !== (sequenceIdx & 0xff)) {
        throw new Error('Invalid sequence')
      }
      blockSize = (responseLength - response.length > packetSize - 5 ? packetSize - 5 : responseLength - response.length)
      if (blockSize > data.length - offset) {
        return
      }
      response = Buffer.concat([response, data.slice(offset, offset + blockSize)], response.length + blockSize)
      offset += blockSize
    }
    return response
  }

  var currentObject = this
  var apdu = Buffer.from(apduHex, 'hex')

  var deferred = Q.defer()
  var exchangeTimeout
  deferred.promise.apdu = apdu
  if (!this.ledgerTransport) {
    deferred.promise.transport = apdu
  } else {
    deferred.promise.transport = ledgerWrap(0x0101, apdu, 64)
  }

  if (this.timeout !== 0) {
    exchangeTimeout = setTimeout(function () { // Node.js supports timeouts
      deferred.reject('timeout')
    }, this.timeout)
  }

  // enter the exchange wait list
  currentObject.exchangeStack.push(deferred)

  if (currentObject.exchangeStack.length === 1) {
    var processNextExchange = function () {
      // don't pop it now, to avoid multiple at once
      var deferred = currentObject.exchangeStack[0]

      var sendAsync = function (cardObject, content) {
        if (cardObject.debug) {
          console.log('=>' + content.toString('hex'))
        }
        var data = [ 0x00 ]
        for (var i = 0; i < content.length; i++) {
          data.push(content[i])
        }
        cardObject.device.write(data)
        return Q.fcall(function () {
          return content.length
        })
      }

      var recvAsync = function (cardObject, size) {
        return Q.ninvoke(cardObject.device, 'read').then(function (res) {
          var buffer = Buffer.from(res)
          if (cardObject.debug) {
            console.log('<=' + buffer.toString('hex'))
          }
          return buffer
        })
      }

      var performExchange = function () {
        var deferredHidSend = Q.defer()
        var offsetSent = 0
        var firstReceived = true
        var toReceive = 0

        var received = Buffer.alloc(0)
        var sendPart = function () {
          if (offsetSent === deferred.promise.transport.length) {
            return receivePart()
          }
          var blockSize = (deferred.promise.transport.length - offsetSent > 64 ? 64 : deferred.promise.transport.length - offsetSent)
          var block = deferred.promise.transport.slice(offsetSent, offsetSent + blockSize)
          var paddingSize = 64 - block.length
          if (paddingSize !== 0) {
            var padding = Buffer.alloc(paddingSize).fill(0)
            block = Buffer.concat([block, padding], block.length + paddingSize)
          }
          return sendAsync(currentObject, block).then(
            function (result) {
              offsetSent += blockSize
              return sendPart()
            }
          ).fail(function (error) {
            deferredHidSend.reject(error)
          })
        }
        var receivePart = function () {
          if (!currentObject.ledgerTransport) {
            return recvAsync(currentObject, 64).then(function (result) {
              received = Buffer.concat([received, result], received.length + result.length)
              if (firstReceived) {
                firstReceived = false
                if ((received.length === 2) || (received[0] !== 0x61)) {
                  deferredHidSend.resolve(received)
                } else {
                  toReceive = received[1]
                  if (toReceive === 0) {
                    toReceive = 256
                  }
                  toReceive += 2
                }
              }
              if (toReceive < 64) {
                deferredHidSend.resolve(received)
              } else {
                toReceive -= 64
                return receivePart()
              }
            }).fail(function (error) {
              deferredHidSend.reject(error)
            })
          } else {
            return recvAsync(currentObject, 64).then(function (result) {
              received = Buffer.concat([received, result], received.length + result.length)
              var response = ledgerUnwrap(0x0101, received, 64)
              if (typeof response !== 'undefined') {
                deferredHidSend.resolve(response)
              } else {
                return receivePart()
              }
            }).fail(function (error) {
              deferredHidSend.reject(error)
            })
          }
        }
        sendPart()
        return deferredHidSend.promise
      }
      performExchange().then(function (result) {
        var resultBin = result
        var status
        if (!currentObject.ledgerTransport) {
          if (resultBin.length === 2 || resultBin[0] !== 0x61) {
            status = (resultBin[0] << 8) | (resultBin[1])
            deferred.promise.response = resultBin.toString('hex')
          } else {
            var size = resultBin.byteAt(1)
            // fake T0
            if (size === 0) { size = 256 }

            deferred.promise.response = resultBin.toString('hex', 2)
            status = (resultBin[2 + size] << 8) | (resultBin[2 + size + 1])
          }
        } else {
          deferred.promise.response = resultBin.toString('hex')
          status = (resultBin[resultBin.length - 2] << 8) | (resultBin[resultBin.length - 1])
        }
        // Check the status
        var statusFound = false
        for (var index in statusList) {
          if (statusList[index] === status) {
            statusFound = true
            break
          }
        }
        if (!statusFound) {
          deferred.reject('Invalid status ' + status.toString(16))
        }
        // build the response
        if (currentObject.timeout !== 0) {
          clearTimeout(exchangeTimeout)
        }
        deferred.resolve(deferred.promise.response)
      })
        .fail(function (err) {
          if (currentObject.timeout !== 0) {
            clearTimeout(exchangeTimeout)
          }
          deferred.reject(err)
        })
        .finally(function () {
          // consume current promise
          currentObject.exchangeStack.shift()

          // schedule next exchange
          if (currentObject.exchangeStack.length > 0) {
            processNextExchange()
          }
        })
    } // processNextExchange

    // schedule next exchange
    processNextExchange()
  }

  // the exchangeStack will process the promise when possible
  return deferred.promise
}

LedgerNode.prototype.setScrambleKey = function (scrambleKey) {
}

LedgerNode.prototype.close_async = function () {
  this.device.close()
  return Q.fcall(function () {
  })
}

LedgerNode.create_async = function (timeout, debug) {
  return LedgerNode.list_async().then(function (result) {
    if (result.length === 0) {
      throw new Error('No device found')
    }
    return new LedgerNode(new HID.HID(result[0]), true, timeout, debug)
  })
}

module.exports = LedgerNode
