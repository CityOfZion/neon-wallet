import { electronAPI } from '@electron-toolkit/preload'

export const customLedgerAPI = {
  getHexPublicKey: (): Promise<any> => electronAPI.ipcRenderer.invoke('getHexPublicKey'),
}
