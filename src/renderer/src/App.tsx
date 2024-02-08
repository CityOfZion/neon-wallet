import { Provider as StoreProvider } from 'react-redux'
import { WalletConnectWalletProvider } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

import { setupSentryWrapper } from './libs/sentryReact'
import { walletConnectOptions } from './libs/walletConnectSDK'
import { RootStore } from './store/RootStore'
import { Router } from './routes'

const queryClient = new QueryClient()

const AppReact = (): JSX.Element => {
  return (
    <StoreProvider store={RootStore.store}>
      <PersistGate persistor={RootStore.persistor}>
        <WalletConnectWalletProvider options={walletConnectOptions}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </WalletConnectWalletProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export const App = setupSentryWrapper(AppReact)
