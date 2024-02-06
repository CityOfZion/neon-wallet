import { ipcMain } from 'electron'

import { getStartInfo, openLedger } from './ledgerHelper'

export function registerLedgerHandlers() {
  ipcMain.handle('getStartInfo', async _event => {
    return getStartInfo()
  })
  ipcMain.handle('openLedger', async (_event, path: string) => {
    return openLedger(path)
  })
}
