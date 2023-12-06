import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { WalletConnectWalletProvider } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

import { ModalRouterProvider } from './contexts/ModalRouterContext'
import { setupSentryWrapper } from './libs/sentryReact'
import { walletConnectOptions } from './libs/walletConnectSDK'
import { modalRoutes } from './routes/modals'
import { pageRouter } from './routes/pages'
import { RootStore } from './store/RootStore'

const queryClient = new QueryClient()

const AppReact = (): JSX.Element => {
  return (
    <StoreProvider store={RootStore.store}>
      <PersistGate persistor={RootStore.persistor}>
        <WalletConnectWalletProvider options={walletConnectOptions}>
          <QueryClientProvider client={queryClient}>
            <ModalRouterProvider routes={modalRoutes}>
              <RouterProvider router={pageRouter} />
            </ModalRouterProvider>
          </QueryClientProvider>
        </WalletConnectWalletProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export const App = setupSentryWrapper(AppReact)
