import { TRoute } from '@renderer/@types/modal'

import { EditWalletModal } from './EditWallet'
import { ImportModal } from './Import'

export const modalRoutes: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
]
