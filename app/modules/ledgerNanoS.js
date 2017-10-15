import commNode from './ledger-comm-node'
import axios from 'axios'
import {
  serializeTransaction,
  create,
  getScriptHashFromAddress,
  ASSETS,
  getPublicKeyEncoded,
  getAccountFromPublicKey,
  getAccountFromWIFKey,
  getBalance,
  addContract,
  queryRPC,
  signatureData,
  getAPIEndpoint
} from 'neon-js'

export let ledgerNanoSGetPublicKey
export let ledgerNanoSGetPublicKeyInfo
export let ledgerNanoSGetDeviceInfo

const bip44Path =
  '8000002C' +
  '80000378' +
  '80000000' +
  '00000000' +
  '00000000'

export const ledgerNanoSGetAsynchGetInfo = function () {
  ledgerNanoSGetDeviceInfo = 'Initialising Device Info'
  ledgerNanoSGetPublicKeyInfo = 'Initialising App Info'

  process.stdout.write('started ledgerNanoSGetAsynchGetInfo  \n')
  var promiseLedgerDevice = new Promise(getLedgerDeviceInfo)
  process.stdout.write('success ledgerNanoSGetAsynchGetInfo  \n')

  var catchFn = function (reason) {
    process.stdout.write('ledgerNanoSGetAsynchGetInfo error reason ' + reason + '\n')
  }

  return promiseLedgerDevice.then(function () {
    var promisePublicKey = new Promise(getPublicKeyInfo)
    return promisePublicKey
  }).catch(catchFn)
}

const getLedgerDeviceInfo = function (resolve, reject) {
  process.stdout.write('started getLedgerDeviceInfo  \n')
  ledgerNanoSGetDeviceInfo = 'Looking for USB Devices'
  commNode.list_async().then(function (result) {
    if (result.length === 0) {
      process.stdout.write('getLedgerDeviceInfo "No device found"\n')
      ledgerNanoSGetDeviceInfo = 'USB Failure : No device found'
      resolve(ledgerNanoSGetDeviceInfo)
    } else {
      commNode.create_async().then(function (comm) {
        var deviceInfo = comm.device.getDeviceInfo()
        ledgerNanoSGetDeviceInfo = 'Found USB ' + deviceInfo.manufacturer + ' ' + deviceInfo.product
        process.stdout.write('getLedgerDeviceInfo success  "' + ledgerNanoSGetDeviceInfo + '"\n')
        comm.device.close()
        resolve(ledgerNanoSGetDeviceInfo)
      })
        .catch(function (reason) {
          ledgerNanoSGetDeviceInfo = 'Finding USB Error :' + reason
          process.stdout.write('getLedgerDeviceInfo error reason "' + reason + '"\n')
          resolve(ledgerNanoSGetDeviceInfo)
        })
    }
  })
  process.stdout.write('success getLedgerDeviceInfo  \n')
}

const getPublicKeyInfo = function (resolve, reject) {
  process.stdout.write('started getPublicKeyInfo  \n')
  ledgerNanoSGetPublicKey = undefined
  ledgerNanoSGetPublicKeyInfo = undefined
  commNode.list_async().then(function (result) {
    if (result.length === 0) {
      process.stdout.write('getPublicKeyInfo "No device found"\n')
      ledgerNanoSGetPublicKeyInfo = 'App Failure : No device found'
      resolve(ledgerNanoSGetDeviceInfo)
    } else {
      commNode.create_async().then(function (comm) {
        var message = Buffer.from('8004000000' + bip44Path, 'hex')
        var validStatus = [0x9000]
        comm.exchange(message.toString('hex'), validStatus).then(function (response) {
          comm.device.close()
          ledgerNanoSGetPublicKey = response.substring(0, 130)
          ledgerNanoSGetPublicKeyInfo = 'App Found, Public Key Available'
          process.stdout.write('getPublicKey success  "' + ledgerNanoSGetPublicKey + '"\n')
          process.stdout.write('getPublicKeyInfo success  "' + ledgerNanoSGetPublicKeyInfo + '"\n')
          resolve(ledgerNanoSGetPublicKeyInfo)
        }).catch(function (reason) {
          comm.device.close()
          process.stdout.write('getPublicKeyInfo comm.exchange error reason ' + reason + '\n')
          if (reason === 'Invalid status 28160') {
            ledgerNanoSGetPublicKeyInfo = 'NEO App does not appear to be open, request for private key returned error 28160.'
          } else {
            ledgerNanoSGetPublicKeyInfo = 'Public Key Comm Messaging Error :' + reason
          }
          resolve(ledgerNanoSGetPublicKeyInfo)
        })
      })
        .catch(function (reason) {
          process.stdout.write('getPublicKeyInfo commNode.create_async error reason ' + reason + '\n')
          ledgerNanoSGetPublicKeyInfo = 'Public Key Comm Init Error :' + reason
          resolve(ledgerNanoSGetPublicKeyInfo)
        })
    }
  })
  process.stdout.write('success getPublicKeyInfo  \n')
}

export const ledgerNanoSGetdoSendAsset = (net, toAddress, fromWif, assetAmounts) => {
  return new Promise(function (resolve, reject) {
    process.stdout.write('started ledgerNanoSGetdoSendAsset \n')
    var fromAccount
    if (fromWif === undefined) {
      const publicKey = ledgerNanoSGetPublicKey
      const publicKeyEncoded = getPublicKeyEncoded(publicKey)
      fromAccount = getAccountFromPublicKey(publicKeyEncoded)
    } else {
      fromAccount = getAccountFromWIFKey(fromWif)
    }
    process.stdout.write('interim ledgerNanoSGetdoSendAsset fromAccount "' + JSON.stringify(fromAccount) + '" \n')

    process.stdout.write('interim ledgerNanoSGetdoSendAsset toAddress "' + toAddress + '" \n')

    const toScriptHash = getScriptHashFromAddress(toAddress)

    process.stdout.write('interim ledgerNanoSGetdoSendAsset toScriptHash "' + toScriptHash + '" \n')

    return getBalance(net, fromAccount.address).then((balances) => {
      process.stdout.write('interim ledgerNanoSGetdoSendAsset getBalance assetAmounts "' + JSON.stringify(assetAmounts) + '" balances "' + JSON.stringify(balances) + '" \n')

      /* eslint-disable */
      const intents = _.map(assetAmounts, (v, k) => {
        return { assetId: ASSETS[k], value: v, scriptHash: toScriptHash }
      })
      /* eslint-enable */

      process.stdout.write('interim ledgerNanoSGetdoSendAsset transferTransaction \n')

      const txData = serializeTransaction(create.contract(fromAccount.publicKeyEncoded, balances, intents))

      process.stdout.write('interim ledgerNanoSGetdoSendAsset txData "' + txData + '" \n')

      ledgerNanoSGetsignAndAddContractAndSendTransaction(fromWif, net, txData, fromAccount).then(function (response) {
        resolve(response)
      })
    })
  })
}

const ledgerNanoSGetsignAndAddContractAndSendTransaction = async function (fromWif, net, txData, account) {
  return new Promise(function (resolve, reject) {
    if (fromWif === undefined) {
      createSignatureAsynch(txData).then(function (sign) {
        process.stdout.write('interim ledgerNanoSGetsignAndAddContractAndSendTransaction sign account "' + JSON.stringify(account) + '" \n')
        process.stdout.write('interim ledgerNanoSGetsignAndAddContractAndSendTransaction sign account.publicKeyEncoded "' + account.publicKeyEncoded + '" \n')
        process.stdout.write('interim ledgerNanoSGetsignAndAddContractAndSendTransaction sign Ledger "' + sign + '" \n')
        ledgerNanoSGetaddContractAndSendTransaction(net, txData, sign, account.publicKeyEncoded).then(function (response) {
          resolve(response)
        })
      })
    } else {
      let sign = signatureData(txData, account.privatekey)
      process.stdout.write('interim ledgerNanoSGetsignAndAddContractAndSendTransaction sign fromWif "' + sign + '" \n')
      ledgerNanoSGetaddContractAndSendTransaction(net, txData, sign, account.publicKeyEncoded).then(function (response) {
        resolve(response)
      })
    }
  })
}

const ledgerNanoSGetaddContractAndSendTransaction = async function (net, txData, sign, publicKeyEncoded) {
  return new Promise(function (resolve, reject) {
    process.stdout.write('interim ledgerNanoSGetaddContractAndSendTransaction txData "' + txData + '" \n')
    process.stdout.write('interim ledgerNanoSGetaddContractAndSendTransaction sign "' + sign + '" \n')
    const txRawData = addContract(txData, sign, publicKeyEncoded)
    process.stdout.write('interim ledgerNanoSGetaddContractAndSendTransaction txRawData "' + txRawData + '" \n')
    queryRPC(net, 'sendrawtransaction', [txRawData], 4).then(function (response) {
      process.stdout.write('interim ledgerNanoSGetaddContractAndSendTransaction response "' + JSON.stringify(response) + '" \n')
      resolve(response)
    })
  })
}

export const ledgerNanoSGetdoClaimAllGas = (net, fromWif) => {
  return new Promise(function (resolve, reject) {
    process.stdout.write('started ledgerNanoSGetdoClaimAllGas \n')
    const apiEndpoint = getAPIEndpoint(net)

    var account
    if (fromWif === undefined) {
      const publicKey = ledgerNanoSGetPublicKey
      const publicKeyEncoded = getPublicKeyEncoded(publicKey)
      account = getAccountFromPublicKey(publicKeyEncoded)
    } else {
      account = getAccountFromWIFKey(fromWif)
    }

    // TODO: when fully working replace this with mainnet/testnet switch
    return axios.get(apiEndpoint + '/v2/address/claims/' + account.address).then((response) => {
      const txData = serializeTransaction(create.claim(account.publicKeyEncoded, response.data))
      process.stdout.write('interim ledgerNanoSGetdoSendAsset txData "' + txData + '" \n')
      process.stdout.write('interim ledgerNanoSGetdoSendAsset account "' + JSON.stringify(account) + '" \n')

      ledgerNanoSGetsignAndAddContractAndSendTransaction(fromWif, net, txData, account).then(function (response) {
        resolve(response)
      })
    })
  })
}

const createSignatureAsynch = function (txData) {
  return new Promise(function (resolve, reject) {
    let signatureInfo = 'Ledger Signing Text of Length [' + txData.length + "], Please Confirm Using the Device's Buttons. " + txData

    const signData = txData + bip44Path

    process.stdout.write(signatureInfo + '\n')

    const validStatus = [0x9000]

    const messages = []

    const bufferSize = 255 * 2
    let offset = 0
    while (offset < signData.length) {
      let chunk
      let p1
      if ((signData.length - offset) > bufferSize) {
        chunk = signData.substring(offset, offset + bufferSize)
      } else {
        chunk = signData.substring(offset)
      }
      if ((offset + chunk.length) === signData.length) {
        p1 = '80'
      } else {
        p1 = '00'
      }

      const chunkLength = chunk.length / 2

      process.stdout.write('Ledger Signature chunkLength ' + chunkLength + '\n')

      let chunkLengthHex = chunkLength.toString(16)
      while (chunkLengthHex.length < 2) {
        chunkLengthHex = '0' + chunkLengthHex
      }

      process.stdout.write('Ledger Signature chunkLength hex ' + chunkLengthHex + '\n')

      messages.push('8002' + p1 + '00' + chunkLengthHex + chunk)
      offset += chunk.length
    }

    commNode.create_async(0, false).then(function (comm) {
      for (let ix = 0; ix < messages.length; ix++) {
        let message = messages[ix]
        process.stdout.write('Ledger Message (' + ix + '/' + messages.length + ') ' + message + '\n')

        comm.exchange(message, validStatus).then(function (response) {
          process.stdout.write('Ledger Signature Response ' + response + '\n')
          if (response !== '9000') {
            comm.device.close()

            /**
             * https://stackoverflow.com/questions/25829939/specification-defining-ecdsa-signature-data <br>
             * the signature is TLV encoded. the first byte is 30, the "signature" type<br>
             * the second byte is the length (always 44)<br>
             * the third byte is 02, the "number: type<br>
             * the fourth byte is the length of R (always 20)<br>
             * the byte after the encoded number is 02, the "number: type<br>
             * the byte after is the length of S (always 20)<br>
             * <p>
             * eg:
             * 304402200262675396fbcc768bf505c9dc05728fd98fd977810c547d1a10c7dd58d18802022069c9c4a38ee95b4f394e31a3dd6a63054f8265ff9fd2baf68a9c4c3aa8c5d47e9000
             * is 30LL0220RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR0220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
             */

            let rLenHex = response.substring(6, 8)
            process.stdout.write('Ledger Signature rLenHex ' + rLenHex + '\n')
            let rLen = parseInt(rLenHex, 16) * 2
            process.stdout.write('Ledger Signature rLen ' + rLen + '\n')
            let rStart = 8
            process.stdout.write('Ledger Signature rStart ' + rStart + '\n')
            let rEnd = rStart + rLen
            process.stdout.write('Ledger Signature rEnd ' + rEnd + '\n')

            while ((response.substring(rStart, rStart + 2) === '00') && ((rEnd - rStart) > 64)) {
              rStart += 2
            }

            let r = response.substring(rStart, rEnd)
            process.stdout.write('Ledger Signature R [' + rStart + ',' + rEnd + ']:' + (rEnd - rStart) + ' ' + r + '\n')
            let sLenHex = response.substring(rEnd + 2, rEnd + 4)
            process.stdout.write('Ledger Signature sLenHex ' + sLenHex + '\n')
            let sLen = parseInt(sLenHex, 16) * 2
            process.stdout.write('Ledger Signature sLen ' + sLen + '\n')
            let sStart = rEnd + 4
            process.stdout.write('Ledger Signature sStart ' + sStart + '\n')
            let sEnd = sStart + sLen
            process.stdout.write('Ledger Signature sEnd ' + sEnd + '\n')

            while ((response.substring(sStart, sStart + 2) === '00') && ((sEnd - sStart) > 64)) {
              sStart += 2
            }

            let s = response.substring(sStart, sEnd)
            process.stdout.write('Ledger Signature S [' + sStart + ',' + sEnd + ']:' + (sEnd - sStart) + ' ' + s + '\n')

            let msgHashStart = sEnd + 4
            let msgHashEnd = msgHashStart + 64
            let msgHash = response.substring(msgHashStart, msgHashEnd)
            process.stdout.write('Ledger Signature msgHash [' + msgHashStart + ',' + msgHashEnd + '] ' + msgHash + '\n')

            while (r.length < 64) {
              r = '00' + r
            }

            while (s.length < 64) {
              s = '00' + s
            }

            let signature = r + s
            let signatureInfo = 'Signature of Length [' + signature.length + '] : ' + signature
            process.stdout.write('r[' + r.length + ']:"' + r + '"+s[' + s.length + ']"' + s + '" =' + signatureInfo + '\n')

            resolve(signature)
          }
        })
          .catch(function (reason) {
            comm.device.close()
            signatureInfo = 'An error occured[1]: ' + reason
            process.stdout.write('Signature Reponse ' + signatureInfo + '\n')
            reject(signatureInfo)
          })
      }
    })
      .catch(function (reason) {
        signatureInfo = 'An error occured[2]: ' + reason
        process.stdout.write('Signature Reponse ' + signatureInfo + '\n')
        reject(signatureInfo)
      })
  })
}
