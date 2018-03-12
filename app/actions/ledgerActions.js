// @flow
import createRequestActions from '../util/api/createRequestActions'
import { getDeviceInfo, getPublicKey } from '../ledger/ledgerNanoS'

export const ID = 'LEDGER'

export default createRequestActions(ID, () => async (state: Object) => {
  const deviceInfo = await getDeviceInfo()
  const publicKey = await getPublicKey()

  return { publicKey, deviceInfo }
})
