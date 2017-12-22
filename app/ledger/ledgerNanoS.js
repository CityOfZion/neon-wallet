import commNode from '../ledger/ledger-comm-node'
import { BIP44_PATH } from '../core/constants'
import {
  serializeTransaction,
  createSignatureScript
} from 'neon-js'
import asyncWrap from '../core/asyncHelper'

export const CURRENT_VERSION = 0

export const ledgerNanoSCreateSignatureAsync = async (unsignedTx, publicKeyEncoded) => {
  const txData = serializeTransaction(unsignedTx)
  const signData = txData + BIP44_PATH
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
    let chunkLengthHex = chunkLength.toString(16)
    while (chunkLengthHex.length < 2) {
      chunkLengthHex = '0' + chunkLengthHex
    }

    messages.push(`8002${p1}00${chunkLengthHex}${chunk}`)
    offset += chunk.length
  }

  let [err, comm] = await asyncWrap(commNode.create_async(0, false))
  if (err) {
    console.log('Signature Reponse An error occured[2]:', err)
    return 'An error occured[2]: ' + err
  }
  for (let ix = 0; ix < messages.length; ix++) {
    let message = messages[ix]

    let [error, response] = await asyncWrap(comm.exchange(message, validStatus))
    if (error) {
      comm.device.close()
      console.log('Signature Reponse An error occured[1]:', error)
      return 'An error occured[1]: ' + error
    }
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
      let rLen = parseInt(rLenHex, 16) * 2
      let rStart = 8
      let rEnd = rStart + rLen

      while ((response.substring(rStart, rStart + 2) === '00') && ((rEnd - rStart) > 64)) {
        rStart += 2
      }

      let r = response.substring(rStart, rEnd)
      let sLenHex = response.substring(rEnd + 2, rEnd + 4)
      let sLen = parseInt(sLenHex, 16) * 2
      let sStart = rEnd + 4
      let sEnd = sStart + sLen

      while ((response.substring(sStart, sStart + 2) === '00') && ((sEnd - sStart) > 64)) {
        sStart += 2
      }

      let s = response.substring(sStart, sEnd)

      while (r.length < 64) {
        r = '00' + r
      }

      while (s.length < 64) {
        s = '00' + s
      }

      const signature = r + s
      const script = createSignatureScript(publicKeyEncoded)

      // txData + '01' (sign num) + '41' (sign struct len) + '40' (sign data len) + signature + '23' (Contract data len) + script
      return `${txData}014140${signature}23${script}`
    }
  }
}
