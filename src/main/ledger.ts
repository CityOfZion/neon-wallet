import { ipcMain } from 'electron'

import { getHexPublicKey } from './ledgerHelper'

export function registerLedgerHandlers() {
  ipcMain.handle('getHexPublicKey', async _event => {
    return getHexPublicKey()
  })
}
