import { TRoute } from '@renderer/@types/modal'

import { AddWatch } from './AddWatch'
import { EditWalletModal } from './EditWallet'
import { ImportModal } from './Import'

export const modalRoutes: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
]
