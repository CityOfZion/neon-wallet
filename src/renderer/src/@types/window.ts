import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    env: {
      WALLET_MNEMONIC: string
    }
  }
}
