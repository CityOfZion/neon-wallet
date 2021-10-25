// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { WalletConnectContextProvider } from '../../context/WalletConnect/WalletConnectContext'

import IntlWrapper from './IntlWrapper'
import Routes from './Routes'

type Props = {
  store: Object,
}

const wcOptions = {
  chainIds: ['neo3:testnet'], // blockchain and network identifier
  methods: ['invokefunction'], // which RPC methods do you plan to call
  relayServer: 'wss://relay.walletconnect.org', // we are using walletconnect's official relay server
  appMetadata: {
    name: 'Neon Wallet',
    description:
      'An open source cross-platform light wallet for the NEO blockchain available on Windows, Mac OS, and Linux.',
    url: 'https://coz.io/',
    icons: [
      'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
    ],
  },
}

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <WalletConnectContextProvider options={wcOptions}>
      <IntlWrapper lang="english">
        <HashRouter>
          <Routes store={store} />
        </HashRouter>
      </IntlWrapper>
    </WalletConnectContextProvider>
  </Provider>
)

export default Root
