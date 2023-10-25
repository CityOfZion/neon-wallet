import { IWalletState, TWalletType } from '@renderer/@types/store'

export class Wallet implements IWalletState {
  id: string
  name: string
  walletType: TWalletType
  encryptedMnemonic?: string

  constructor(data: IWalletState) {
    this.id = data.id
    this.name = data.name
    this.walletType = data.walletType
    this.encryptedMnemonic = data.encryptedMnemonic
  }

  deserialize() {
    const { deserialize: _, ...deserializeWallet } = this
    const result: IWalletState = deserializeWallet
    return result
  }
}
