import { AbstractWalletConnectNeonAdapter } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { TAdapterMethodParam } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TOptions } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { RootStore } from '@renderer/store/RootStore'
import i18n from 'i18next'
export class WalletConnectNeonAdapter extends AbstractWalletConnectNeonAdapter {
  async getAccountString({ session }: TAdapterMethodParam): Promise<string> {
    const {
      account: { data: accounts },
      settings: { encryptedPassword },
    } = RootStore.store.getState()

    const [{ address }] = WalletConnectHelper.getAccountInformationFromSession(session)
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

  async getRPCUrl({ session }: TAdapterMethodParam): Promise<string> {
    const {
      blockchain: { bsAggregator },
    } = RootStore.store.getState()

    const [{ blockchain }] = WalletConnectHelper.getAccountInformationFromSession(session)

    return bsAggregator.getBlockchainByName(blockchain).network.url
  }
}

export const walletConnectOptions: TOptions = {
  clientOptions: {
    projectId: '56de852a69580b46d61b53f7b3922ce1',
    metadata: {
      name: i18n.t('common:walletConnect.name'),
      description: i18n.t('common:walletConnect.description'),
      url: 'https://coz.io/',
      icons: [
        'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
      ],
    },
    logger: import.meta.env.DEV ? 'debug' : undefined,
    relayUrl: 'wss://relay.walletconnect.com',
  },
  methods: [
    'invokeFunction',
    'testInvoke',
    'signMessage',
    'verifyMessage',
    'getWalletInfo',
    'traverseIterator',
    'getNetworkVersion',
    'encrypt',
    'decrypt',
    'decryptFromArray',
    'calculateFee',
    'signTransaction',
  ],
  autoAcceptMethods: ['testInvoke', 'getWalletInfo', 'traverseIterator', 'getNetworkVersion', 'calculateFee'],
  adapter: new WalletConnectNeonAdapter(),
}
