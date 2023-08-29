// @flow
import { createActions } from 'spunky'
import { getDeviceInfo } from '../ledger/neonLedger'
import { getStartInfo } from '../ledger/n3NeonLedger'

export const ID = 'ledger'

export default createActions(ID, ({ chain }) => async () => {
  const { deviceInfo, publicKey } =
    chain === 'neo3' ? await getStartInfo() : await getDeviceInfo()
  return { deviceInfo, publicKey }
})
