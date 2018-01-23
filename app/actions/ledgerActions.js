// @flow
import createBatchActions from '../util/api/createBatchActions'
import createRequestActions from '../util/api/createRequestActions'
import getDeviceInfo from '../ledger/getDeviceInfo'
import getPublicKey from '../ledger/getPublicKey'

const DEVICE_ID = 'LEDGER_DEVICE'
const PUBLIC_KEY_ID = 'LEDGER_PUBLIC_KEY'

export const ID = 'LEDGER'

const deviceInfoActions = createRequestActions(DEVICE_ID, () => async (state: Object) => {
  return getDeviceInfo()
})

const publicKeyActions = createRequestActions(PUBLIC_KEY_ID, () => async (state: Object) => {
  return getPublicKey()
})

export default createBatchActions(ID, {
  deviceInfo: deviceInfoActions,
  publicKey: publicKeyActions
})
