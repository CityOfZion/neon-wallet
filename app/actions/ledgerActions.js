// @flow
import { createActions } from 'spunky'
import { getDeviceInfo } from '../ledger/neonLedger'
import { getStartInfo } from '../ledger/n3NeonLedger'
import { getSettings } from './settingsActions'

export const ID = 'ledger'

export default createActions(ID, () => async () => {
  const { chain } = await getSettings()
  const { deviceInfo, publicKey } =
    chain === 'neo3' ? await getStartInfo() : await getDeviceInfo()
  return { deviceInfo, publicKey }
})
