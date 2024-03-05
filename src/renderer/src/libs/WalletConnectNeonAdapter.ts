import { DEFAULT_URL_BY_NETWORK_TYPE } from '@cityofzion/bs-neo3'
import { tx } from '@cityofzion/neon-core'
import { AbstractWalletConnectNeonAdapter } from '@cityofzion/wallet-connect-sdk-wallet-core'
import type { TAdapterMethodParam } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { RootStore } from '@renderer/store/RootStore'

export class WalletConnectNeonAdapter extends AbstractWalletConnectNeonAdapter {
  static supportedSignerByName: Record<string, tx.WitnessScope> = {
    None: tx.WitnessScope.None,
    CalledByEntry: tx.WitnessScope.CalledByEntry,
    CustomContracts: tx.WitnessScope.CustomContracts,
    CustomGroups: tx.WitnessScope.CustomGroups,
    WitnessRules: tx.WitnessScope.WitnessRules,
    Global: tx.WitnessScope.Global,
  }

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

  static resolveSigner(scope: string | number) {
    let witnessScope: string = scope.toString()

    if (typeof scope === 'number') {
      witnessScope = tx.toString(scope)
    } else if (typeof scope === 'string' && this.supportedSignerByName[scope]) {
      witnessScope = tx.parse(scope).toString()
    }

    return witnessScope
  }
}
