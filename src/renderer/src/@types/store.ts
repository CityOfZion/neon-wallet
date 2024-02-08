import { BSAggregator } from '@cityofzion/blockchain-service'
import { RootStore } from '@renderer/store/RootStore'

import { TBlockchainServiceKey, TNetworkType } from './blockchain'

export interface IAccountState {
  address: string
  accountType: TWalletType
  idWallet: string
  name: string
  backgroundColor: string
  blockchain: TBlockchainServiceKey
  encryptedKey?: string
  order: number
}

export interface IBlockchainState {
  bsAggregator: BSAggregator<TBlockchainServiceKey>
}

export type TWalletType = 'standard' | 'watch' | 'legacy'
export interface IWalletState {
  id: string
  name: string
  walletType: TWalletType
  encryptedMnemonic?: string
}
export type TSecurityType = 'none' | 'password'

export interface ISettingsState {
  encryptedPassword?: string
  isFirstTime: boolean
  securityType: TSecurityType
  networkType: TNetworkType
}

export type TContactAddress = { address: string; blockchain: TBlockchainServiceKey }
export interface IContactState {
  id: string
  name: string
  addresses: TContactAddress[]
}

export type RootState = ReturnType<typeof RootStore.reducers>
export type AppDispatch = typeof RootStore.store.dispatch
