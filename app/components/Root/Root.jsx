// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { WalletConnectContextProvider } from '../../context/WalletConnect/WalletConnectContext'
import { SettingsContextProvider } from '../../context/settings/SettingsContext'
import {
  DEFAULT_APP_METADATA,
  DEFAULT_PROJECT_ID,
  DEFAULT_RELAY_PROVIDER,
} from '../../core/constants'
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
    <ChakraProvider resetCSS={false}>
      <SettingsContextProvider>
        <WalletConnectContextProvider options={wcOptions}>
          <IntlWrapper lang="english">
            <HashRouter>
              <Routes store={store} />
            </HashRouter>
          </IntlWrapper>
        </WalletConnectContextProvider>
      </SettingsContextProvider>
    </ChakraProvider>
  </Provider>
)

export default Root
