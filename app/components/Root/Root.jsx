// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { WalletConnectWalletProvider } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { SettingsContextProvider } from '../../context/settings/SettingsContext'
import IntlWrapper from './IntlWrapper'
import Routes from './Routes'
import ContactsContextProvider from '../../context/contacts'
import { walletConnectOptions } from '../../util/walletConnect'
import { setupSentryWrapper } from '../../util/SentryReactHelper'

type Props = {
  store: Object,
}

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <ChakraProvider resetCSS={false}>
      <SettingsContextProvider>
        <WalletConnectWalletProvider options={walletConnectOptions}>
          <ContactsContextProvider>
            <IntlWrapper lang="english">
              <HashRouter>
                <Routes store={store} />
              </HashRouter>
            </IntlWrapper>
          </ContactsContextProvider>
        </WalletConnectWalletProvider>
      </SettingsContextProvider>
    </ChakraProvider>
  </Provider>
)

export default setupSentryWrapper(Root)
