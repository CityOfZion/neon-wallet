// @flow
import { createActions } from 'spunky'
import { getDeviceInfo } from '../ledger/neonLedger'

export const ID = 'ledger'

export default createActions(ID, () => async () => {
  const { deviceInfo, publicKey } = await getDeviceInfo()
  return { deviceInfo, publicKey }
})
