import { TRoute } from '@renderer/@types/modal'

import { AddAddressModal } from './modals/AddAddress'
import { AddWatch } from './modals/AddWatch'
import { BlockchainSelectionModal } from './modals/BlockchainSelection'
import { ConfirmPasswordBackupModal } from './modals/ConfirmPasswordBackup'
import { CreateWalletStep1Modal } from './modals/CreateWallet/CreateWalletStep1Modal'
import { CreateWalletStep2Modal } from './modals/CreateWallet/CreateWalletStep2Modal'
import { CreateWalletStep3Modal } from './modals/CreateWallet/CreateWalletStep3Modal'
import { CreateWalletStep4Modal } from './modals/CreateWallet/CreateWalletStep4Modal'
import { DappConnectionModal } from './modals/DappConnection'
import { DappConnectionDetailsModal } from './modals/DappConnectionDetails'
import { DappDisconnectionModal } from './modals/DappDisconnection'
import { DappPermissionModal } from './modals/DappPermission'
import { DappPermissionContractDetailsModal } from './modals/DappPermissionContractDetails'
import { DappPermissionSignatureScopeModal } from './modals/DappPermissionSignatureScope'
import { DecryptKeyModal } from './modals/DecryptKeyModal'
import { DeleteAccountModal } from './modals/DeleteAccount'
import { DeleteWalletModal } from './modals/DeleteWallet'
import { EditWalletModal } from './modals/EditWallet'
import { ErrorModal } from './modals/Error'
import { ImportModal } from './modals/Import'
import { ImportKeyAccountsSelectionModal } from './modals/Import/ImportKeyAccountsSelectionModal'
import { ImportMnemonicAccountsSelectionModal } from './modals/Import/ImportMnemonicAccountsSelectionModal'
import { InputAmount } from './modals/InputAmount'
import { NetworkSelection } from './modals/NetworkSelection'
import { PersistAccountModal } from './modals/PersistAccount'
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
  { name: 'confirm-password-backup', element: <ConfirmPasswordBackupModal /> },
  { name: 'add-watch', element: <AddWatch /> },
  { name: 'edit-wallet', element: <EditWalletModal /> },
  { name: 'persist-account', element: <PersistAccountModal /> },
  { name: 'delete-account', element: <DeleteAccountModal /> },
  { name: 'delete-wallet', element: <DeleteWalletModal /> },
  { name: 'create-wallet-step-1', element: <CreateWalletStep1Modal /> },
  { name: 'create-wallet-step-2', element: <CreateWalletStep2Modal /> },
  { name: 'create-wallet-step-3', element: <CreateWalletStep3Modal /> },
  { name: 'create-wallet-step-4', element: <CreateWalletStep4Modal /> },
  { name: 'persist-contact', element: <PersistContactModal /> },
  { name: 'delete-contact', element: <DeleteModal /> },
  { name: 'add-address', element: <AddAddressModal /> },
  { name: 'success', element: <SuccessModal /> },
  { name: 'error', element: <ErrorModal /> },
  { name: 'dapp-disconnection', element: <DappDisconnectionModal /> },
  { name: 'dapp-connection', element: <DappConnectionModal /> },
  { name: 'dapp-connection-details', element: <DappConnectionDetailsModal /> },
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
