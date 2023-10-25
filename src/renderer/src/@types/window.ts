import { ElectronAPI } from '@electron-toolkit/preload'

import { customAPI } from '../../../preload/customAPI'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof customAPI
    env: {
      WALLET_MNEMONIC: string
    }
  }
}
