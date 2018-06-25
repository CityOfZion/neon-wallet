// @flow
import { createActions } from 'spunky'

import { getDeviceInfo, getPublicKey } from '../ledger/ledgerNanoS'

export const ID = 'ledger'

export default createActions(ID, () => async () => {
  const deviceInfo = await getDeviceInfo()
  const publicKey = await getPublicKey()

  return { publicKey, deviceInfo }
})
