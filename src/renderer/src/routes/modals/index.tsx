import { TRoute } from '@renderer/@types/modal'

import { AddAddressModalStep1 } from './AddAddress/Step1'
import { AddAddressModalStep2 } from './AddAddress/Step2'
import { AddAddressModalStep3 } from './AddAddress/Step3'
import { AddWatch } from './AddWatch'
import { EditAccountModal } from './EditAccount'
import { EditWalletModal } from './EditWallet'
import { EncryptedKeyModal } from './EncryptedKey'
import { ImportModal } from './Import'
import { MnemonicAccountSelectionModal } from './MnemonicAccountSelection'
import { PersistContactModal } from './PersistContact'

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
  { name: 'encrypted-key', element: <EncryptedKeyModal /> },
]
