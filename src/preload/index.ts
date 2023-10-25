import { electronAPI } from '@electron-toolkit/preload'
import { config } from 'dotenv'
import { contextBridge } from 'electron'

import { customAPI } from './customAPI'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', customAPI)
    contextBridge.exposeInMainWorld('env', config().parsed)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
