import { TRoute } from '@renderer/@types/modal'

import { AddAddressModal } from './modals/AddAddress'
import { AddWatch } from './modals/AddWatch'
import { BlockchainSelectionModal } from './modals/BlockchainSelection'
import { DappConnectionModal } from './modals/DappConnection'
import { DappConnectionAccountSelectionModal } from './modals/DappConnectionAccountSelection'
import { DappConnectionDetailsModal } from './modals/DappConnectionDetails'
import { DappDisconnectionModal } from './modals/DappDisconnection'
import { DappPermissionModal } from './modals/DappPermission'
import { DappPermissionContractDetailsModal } from './modals/DappPermissionContractDetails'
import { DappPermissionSignatureScopeModal } from './modals/DappPermissionSignatureScope'
import { DecryptKeyModal } from './modals/DecryptKeyModal'
import { EditAccountModal } from './modals/EditAccount'
import { EditWalletModal } from './modals/EditWallet'
import { ErrorModal } from './modals/Error'
import { ImportModal } from './modals/Import'
import { ImportKeyAccountsSelectionModal } from './modals/Import/ImportKeyAccountsSelectionModal'
import { ImportMnemonicAccountsSelectionModal } from './modals/Import/ImportMnemonicAccountsSelectionModal'
import { InputAmount } from './modals/InputAmount'
import { NetworkSelection } from './modals/NetworkSelection'
import { PersistContactModal } from './modals/PersistContact'
import { DeleteModal } from './modals/PersistContact/DeleteModal'
import { SelectAccount } from './modals/SelectAccount'
import { SelectContact } from './modals/SelectContact'
import { SelectToken } from './modals/SelectToken'
import { SuccessModal } from './modals/Success'

export const modalsRouter: TRoute[] = [
  { name: 'import', element: <ImportModal /> },
  { name: 'import-mnemonic-accounts-selection', element: <ImportMnemonicAccountsSelectionModal /> },
  { name: 'import-key-accounts-selection', element: <ImportKeyAccountsSelectionModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
  { name: 'edit-account', element: <EditAccountModal /> },
  { name: 'persist-contact', element: <PersistContactModal /> },
  { name: 'delete-contact', element: <DeleteModal /> },
  { name: 'add-address', element: <AddAddressModal /> },
  { name: 'success', element: <SuccessModal /> },
  { name: 'error', element: <ErrorModal /> },
  { name: 'dapp-disconnection', element: <DappDisconnectionModal /> },
  { name: 'dapp-connection', element: <DappConnectionModal /> },
  { name: 'dapp-connection-details', element: <DappConnectionDetailsModal /> },
  { name: 'dapp-connection-account-selection', element: <DappConnectionAccountSelectionModal /> },
  { name: 'dapp-permission', element: <DappPermissionModal /> },
  { name: 'dapp-permission-contract-details', element: <DappPermissionContractDetailsModal /> },
  { name: 'dapp-permission-signature-scope', element: <DappPermissionSignatureScopeModal /> },
  { name: 'select-contact', element: <SelectContact /> },
  { name: 'blockchain-selection', element: <BlockchainSelectionModal /> },
  { name: 'decrypt-key', element: <DecryptKeyModal /> },
  { name: 'select-account', element: <SelectAccount /> },
  { name: 'select-token', element: <SelectToken /> },
  { name: 'input-amount', element: <InputAmount /> },
  { name: 'network-selection', element: <NetworkSelection /> },
]
