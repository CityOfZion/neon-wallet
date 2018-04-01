// @flow
import { createActions } from 'spunky'

import { getDeviceInfo, getPublicKey } from '../ledger/ledgerNanoS'

export const ID = 'LEDGER'

export default createActions(ID, () => async (state: Object) => {
  const deviceInfo = await getDeviceInfo()
  const publicKey = await getPublicKey()

  return { publicKey, deviceInfo }
})
