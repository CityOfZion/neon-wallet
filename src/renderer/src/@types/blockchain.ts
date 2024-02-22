import { NetworkType } from '@cityofzion/blockchain-service'

import { IWalletState, TWalletType } from './store'

export type TBlockchainServiceKey = 'neo3' | 'neoLegacy' | 'ethereum'
export type TBlockchainImageColor = 'white' | 'default' | 'blue'
export type TAccountColorKey = 'green' | 'blue' | 'magenta' | 'gray' | 'yellow' | 'purple' | 'orange'

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
}

export type TWalletToCreate = {
  name: string
  walletType: TWalletType
  mnemonic?: string
}

export type TNetworkType = Exclude<NetworkType, 'custom'>
