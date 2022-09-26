// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { DEFAULT_RELAY_PROVIDER } from '../../context/WalletConnect/constants'
import { WalletConnectContextProvider } from '../../context/WalletConnect/WalletConnectContext'
import { DEFAULT_APP_METADATA, DEFAULT_PROJECT_ID } from '../../core/constants'

import IntlWrapper from './IntlWrapper'
import Routes from './Routes'

type Props = {
  store: Object,
}

const wcOptions = {
  appMetadata: DEFAULT_APP_METADATA,
  relayServer: DEFAULT_RELAY_PROVIDER,
  projectId: DEFAULT_PROJECT_ID,
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
