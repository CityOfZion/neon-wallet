import { electronAPI } from '@electron-toolkit/preload'
import { OpenDialogOptions } from 'electron'

export const customAPI = {
  encryptBasedOS: (value: string): Promise<string> => electronAPI.ipcRenderer.invoke('encryptBasedOS', value),

  decryptBasedOS: (value: string): Promise<string> => electronAPI.ipcRenderer.invoke('decryptBasedOS', value),

  encryptBasedEncryptedSecret: async (value: string, encryptedSecret?: string): Promise<string> => {
    if (!encryptedSecret) {
      return await electronAPI.ipcRenderer.invoke('encryptBasedOS', value)
    }

    const secret = await electronAPI.ipcRenderer.invoke('decryptBasedOS', encryptedSecret)
    const encryptedBySecretValue = await electronAPI.ipcRenderer.invoke('encryptBasedSecret', value, secret)
    return await electronAPI.ipcRenderer.invoke('encryptBasedOS', encryptedBySecretValue)
  },

  decryptBasedEncryptedSecret: async (value: string, encryptedSecret?: string): Promise<string> => {
    if (!encryptedSecret) {
      return electronAPI.ipcRenderer.invoke('decryptBasedOS', value)
    }

    const decryptedByOSValue = await electronAPI.ipcRenderer.invoke('decryptBasedOS', value)
    const secret = await electronAPI.ipcRenderer.invoke('decryptBasedOS', encryptedSecret)
    return electronAPI.ipcRenderer.invoke('decryptBasedSecret', decryptedByOSValue, secret)
  },

  encryptBasedSecret: (value: string, secret: string): Promise<string> =>
    electronAPI.ipcRenderer.invoke('encryptBasedSecret', value, secret),

  decryptBasedSecret: (value: string, secret: string): Promise<string> =>
    electronAPI.ipcRenderer.invoke('decryptBasedSecret', value, secret),

  restoreWindow: () => electronAPI.ipcRenderer.invoke('restore'),

  openDialog: (options: OpenDialogOptions): Promise<string[]> => electronAPI.ipcRenderer.invoke('openDialog', options),

  readFile: (path: string): Promise<string> => electronAPI.ipcRenderer.invoke('readFile', path),

  saveFile: (path: string, content: string): Promise<void> => electronAPI.ipcRenderer.invoke('saveFile', path, content),
}
