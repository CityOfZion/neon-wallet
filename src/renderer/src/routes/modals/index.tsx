import { TRoute } from '@renderer/@types/modal'

import { AddAddressModalStep1 } from './AddAddress/Step1'
import { AddAddressModalStep2 } from './AddAddress/Step2'
import { AddAddressModalStep3 } from './AddAddress/Step3'
import { AddWatch } from './AddWatch'
import { EditAccountModal } from './EditAccount'
import { EditWalletModal } from './EditWallet'
import { ImportModal } from './Import'
import { PersistContactModal } from './PersistContact'

export const modalRoutes: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
  { name: 'edit-account', element: <EditAccountModal /> },
  { name: 'persistContact', element: <PersistContactModal /> },
  { name: 'addAddressStep1', element: <AddAddressModalStep1 /> },
  { name: 'addAddressStep2', element: <AddAddressModalStep2 /> },
  { name: 'addAddressStep3', element: <AddAddressModalStep3 /> },
]
