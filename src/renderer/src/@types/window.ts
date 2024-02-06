import { ElectronAPI } from '@electron-toolkit/preload'

import { customAPI } from '../../../preload/customAPI'
import { customLedgerAPI } from '../../../preload/customLedgerAPI'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof customAPI
    ledger: typeof customLedgerAPI
  }
}
