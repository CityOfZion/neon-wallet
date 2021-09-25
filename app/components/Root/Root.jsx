// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { WalletConnectContextProvider } from '@cityofzion/wallet-connect-sdk-react'

import IntlWrapper from './IntlWrapper'
import Routes from './Routes'

type Props = {
  store: Object,
}

const wcOptions = {
  chainId: 'neo3:testnet', // blockchain and network identifier
  logger: 'debug', // use debug to show all log information on browser console
  methods: ['invokefunction'], // which RPC methods do you plan to call
  relayServer: 'wss://relay.walletconnect.org', // we are using walletconnect's official relay server
  appMetadata: {
    name: 'MyApplicationName', // your application name to be displayed on the wallet
    description: 'My Application description', // description to be shown on the wallet
    url: 'https://myapplicationdescription.app/', // url to be linked on the wallet
    icons: ['https://myapplicationdescription.app/myappicon.png'], // icon to be shown on the wallet
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
