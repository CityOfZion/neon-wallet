import { electronAPI } from '@electron-toolkit/preload'

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
}
