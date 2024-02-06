import { electronAPI } from '@electron-toolkit/preload'

export const customLedgerAPI = {
  getStartInfo: (): Promise<any> => electronAPI.ipcRenderer.invoke('getStartInfo'),
  openLedger: (path: string): Promise<string> => electronAPI.ipcRenderer.invoke('openLedger', path),
}
