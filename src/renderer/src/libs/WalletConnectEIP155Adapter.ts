import { DEFAULT_URL_BY_NETWORK_TYPE } from '@cityofzion/bs-ethereum'
import { AbstractWalletConnectEIP155Adapter } from '@cityofzion/wallet-connect-sdk-wallet-core'
import type { TAdapterMethodParam } from '@cityofzion/wallet-connect-sdk-wallet-react'

import { WalletConnectHelper } from '../helpers/WalletConnectHelper'
import { RootStore } from '../store/RootStore'

export class WalletConnectEIP155Adapter extends AbstractWalletConnectEIP155Adapter {
  async getAccountString({ session }: TAdapterMethodParam): Promise<string> {
    const {
      account: { data: accounts },
      settings: { encryptedPassword },
    } = RootStore.store.getState()

    const { address } = WalletConnectHelper.getAccountInformationFromSession(session)
    const account = accounts.find(account => account.address === address)
    if (!account) throw new Error('Account not found')
    if (!account.encryptedKey) throw new Error('Key not found')

    const key = await window.api.decryptBasedEncryptedSecret(account.encryptedKey, encryptedPassword)
    if (!key) throw new Error('Error to decrypt key')

    return key
  }

  async getWalletInfo(): Promise<any> {
    // TODO: Implement this method when ledger is supported. Task link: https://app.clickup.com/t/86a1n66zt
    return {
      isLedger: false,
    }
  }

  async getRPCUrl(): Promise<string> {
    const {
      settings: { networkType },
    } = RootStore.store.getState()

    return DEFAULT_URL_BY_NETWORK_TYPE[networkType]
  }
}
