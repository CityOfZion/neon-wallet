import { TRoute } from '@renderer/@types/modal'

import { AddAddressModalStep1 } from './modals/AddAddress/Step1'
import { AddAddressModalStep2 } from './modals/AddAddress/Step2'
import { AddAddressModalStep3 } from './modals/AddAddress/Step3'
import { AddWatch } from './modals/AddWatch'
import { BlockchainSelectionModal } from './modals/BlockchainSelection'
import { DappConnectionModal } from './modals/DappConnection'
import { DappConnectionAccountSelectionModal } from './modals/DappConnectionAccountSelection'
import { DappConnectionDetailsModal } from './modals/DappConnectionDetails'
import { DappConnectionListModal } from './modals/DappConnectionList'
import { EditAccountModal } from './modals/EditAccount'
import { EditWalletModal } from './modals/EditWallet'
import { ErrorModal } from './modals/Error'
import { ImportModal } from './modals/Import'
import { ImportEncryptedPasswordModal } from './modals/Import/ImportEncryptedPasswordModal'
import { ImportKeyAccountsSelectionModal } from './modals/Import/ImportKeyAccountsSelectionModal'
import { ImportMnemonicAccountsSelectionModal } from './modals/Import/ImportMnemonicAccountsSelectionModal'
import { PersistContactModal } from './modals/PersistContact'
import { SelectContact } from './modals/SelectContact'
import { SuccessModal } from './modals/Success'

export const modalsRouter: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'import-mnemonic-accounts-selection', element: <ImportMnemonicAccountsSelectionModal /> },
  { name: 'import-key-accounts-selection', element: <ImportKeyAccountsSelectionModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
  { name: 'edit-account', element: <EditAccountModal /> },
  { name: 'persist-contact', element: <PersistContactModal /> },
  { name: 'add-address-step1', element: <AddAddressModalStep1 /> },
  { name: 'add-address-step2', element: <AddAddressModalStep2 /> },
  { name: 'add-address-step3', element: <AddAddressModalStep3 /> },
  { name: 'success', element: <SuccessModal /> },
  { name: 'error', element: <ErrorModal /> },
  { name: 'dapp-connection', element: <DappConnectionModal /> },
  { name: 'dapp-connection-details', element: <DappConnectionDetailsModal /> },
  { name: 'dapp-connection-account-selection', element: <DappConnectionAccountSelectionModal /> },
  { name: 'dapp-connection-list', element: <DappConnectionListModal /> },
  { name: 'select-contact', element: <SelectContact /> },
  { name: 'blockchain-selection', element: <BlockchainSelectionModal /> },
  { name: 'import-encrypted-password', element: <ImportEncryptedPasswordModal /> },
]
