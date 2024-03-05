import type { TInitOptions } from '@cityofzion/wallet-connect-sdk-wallet-react'
import i18n from 'i18next'

import { WalletConnectEIP155Adapter } from './WalletConnectEIP155Adapter'
import { WalletConnectNeonAdapter } from './WalletConnectNeonAdapter'

export const walletConnectOptions: TInitOptions = {
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
  blockchains: {
    neo3: {
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
    },
    eip155: {
      methods: [
        'personal_sign',
        'eth_sign',
        'eth_signTransaction',
        'eth_signTypedData',
        'eth_signTypedData_v3',
        'eth_signTypedData_v4',
        'eth_sendTransaction',
      ],
      events: ['chainChanged', 'accountsChanged'],
      adapter: new WalletConnectEIP155Adapter(),
    },
  },
}
