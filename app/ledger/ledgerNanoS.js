import commNode from '../ledger/ledger-comm-node'
import { BIP44_PATH } from '../core/constants'

export const ledgerNanoSCreateSignatureAsynch = (txData) => {
  return new Promise((resolve, reject) => {
    let signatureInfo = 'Ledger Signing Text of Length [' + txData.length + "], Please Confirm Using the Device's Buttons. " + txData

    const signData = txData + BIP44_PATH

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

    commNode.create_async(0, false).then((comm) => {
      for (let ix = 0; ix < messages.length; ix++) {
        let message = messages[ix]
        process.stdout.write('Ledger Message (' + ix + '/' + messages.length + ') ' + message + '\n')

        comm.exchange(message, validStatus).then((response) => {
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
        }).catch((reason) => {
          comm.device.close()
          signatureInfo = 'An error occured[1]: ' + reason
          process.stdout.write('Signature Reponse ' + signatureInfo + '\n')
          reject(signatureInfo)
        })
      }
    }).catch((reason) => {
      signatureInfo = 'An error occured[2]: ' + reason
      process.stdout.write('Signature Reponse ' + signatureInfo + '\n')
      reject(signatureInfo)
    })
  })
}
