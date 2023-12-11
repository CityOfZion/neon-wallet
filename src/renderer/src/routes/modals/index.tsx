import { TRoute } from '@renderer/@types/modal'

import { AddAddressModalStep1 } from './AddAddress/Step1'
import { AddAddressModalStep2 } from './AddAddress/Step2'
import { AddAddressModalStep3 } from './AddAddress/Step3'
import { AddWatch } from './AddWatch'
import { DappConnectionModal } from './DappConnection'
import { DappConnectionAccountSelectionModal } from './DappConnectionAccountSelection'
import { DappConnectionDetailsModal } from './DappConnectionDetails'
import { EditAccountModal } from './EditAccount'
import { EditWalletModal } from './EditWallet'
import { ErrorModal } from './Error'
import { ImportModal } from './Import'
import { MnemonicAccountSelectionModal } from './MnemonicAccountSelection'
import { PersistContactModal } from './PersistContact'
import { SuccessModal } from './Success'

export const modalRoutes: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
  { name: 'edit-account', element: <EditAccountModal /> },
  { name: 'persist-contact', element: <PersistContactModal /> },
  { name: 'add-address-step1', element: <AddAddressModalStep1 /> },
  { name: 'add-address-step2', element: <AddAddressModalStep2 /> },
  { name: 'add-address-step3', element: <AddAddressModalStep3 /> },
  { name: 'mnemonic-account-selection', element: <MnemonicAccountSelectionModal /> },
  { name: 'success', element: <SuccessModal /> },
  { name: 'error', element: <ErrorModal /> },
  { name: 'dapp-connection', element: <DappConnectionModal /> },
  { name: 'dapp-connection-details', element: <DappConnectionDetailsModal /> },
  { name: 'dapp-connection-account-selection', element: <DappConnectionAccountSelectionModal /> },
]
