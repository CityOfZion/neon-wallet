import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

import { customAPI } from './customAPI'
import { customLedgerAPI } from './customLedgerAPI'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', customAPI)
    contextBridge.exposeInMainWorld('ledger', customLedgerAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
