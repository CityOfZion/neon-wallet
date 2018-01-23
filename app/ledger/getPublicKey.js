// @flow
import connect from './connect'
import { BIP44_PATH } from '../core/constants'

const MESSAGE = Buffer.from(`8004000000${BIP44_PATH}`, 'hex').toString('hex')
const VALID_STATUS = [0x9000]

export default async function getPublicKey () {
  const comm = await connect()

  try {
    const response = await comm.exchange(MESSAGE, VALID_STATUS)
    return response.substring(0, 130)
  } catch (error) {
    console.error(error)

    if (error === 'Invalid status 28160') {
      throw new Error('NEO App does not appear to be open, request for private key returned error 28160.')
    } else {
      throw new Error('Hardware Device Error. Login to NEO App and try again')
    }
  } finally {
    comm.device.close()
  }
}
