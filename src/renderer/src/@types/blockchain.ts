import { NetworkType } from '@cityofzion/blockchain-service'

import { IContactState, IWalletState, TWalletType } from './store'

export type TBlockchainServiceKey = 'neo3' | 'neoLegacy' | 'ethereum'
export type TBlockchainImageColor = 'white' | 'gray' | 'blue'
export type TAccountColorKey = 'green' | 'blue' | 'magenta' | 'lightBlue' | 'yellow' | 'purple' | 'orange'

export type TAccountToImport = {
  address: string
  blockchain: TBlockchainServiceKey
  wallet: IWalletState
  type: TWalletType
  key?: string
  name?: string
  order?: number
}

export type TAccountsToImport = Omit<TAccountToImport, 'wallet' | 'order'>[]

export type TImportAccountsParam = {
  wallet: IWalletState
  accounts: TAccountsToImport
}

export type TAccountToCreate = {
  wallet: IWalletState
  name: string
  blockchain: TBlockchainServiceKey
  backgroundColor?: string
}

export type TWalletToCreate = {
  name: string
  walletType: TWalletType
  mnemonic?: string
}

export type TNetworkType = Exclude<NetworkType, 'custom'>

export type TAccountBackupFormat = {
  address: string
  accountType: TWalletType
  idWallet: string
  name: string
  backgroundColor: string
  blockchain: TBlockchainServiceKey
  key?: string
  order: number
}

export type TWalletBackupFormat = {
  id: string
  name: string
  walletType: TWalletType
  mnemonic?: string
  accounts: TAccountBackupFormat[]
}

export type TBackupFormat = {
  wallets: TWalletBackupFormat[]
  contacts: IContactState[]
}
