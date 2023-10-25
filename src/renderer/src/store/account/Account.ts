import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IAccountState, TWalletType } from '@renderer/@types/store'

export class Account implements IAccountState {
  address: string
  accountType: TWalletType
  idWallet: string
  name: string
  backgroundColor: string
  blockchain: TBlockchainServiceKey
  encryptedKey?: string

  constructor(data: IAccountState) {
    this.address = data.address
    this.accountType = data.accountType
    this.idWallet = data.idWallet
    this.name = data.name
    this.blockchain = data.blockchain
    this.backgroundColor = data.backgroundColor
    this.encryptedKey = data.encryptedKey
  }

  deserialize() {
    const { deserialize: _, ...deserializedAccount } = this
    const result: IAccountState = deserializedAccount
    return result
  }
}
