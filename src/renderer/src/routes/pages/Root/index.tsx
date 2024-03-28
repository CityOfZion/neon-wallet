import { useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { WalletConnectWalletProvider } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { ModalRouterProvider } from '@renderer/contexts/ModalRouterContext'
import { queryClient } from '@renderer/libs/query'
import { ToastProvider } from '@renderer/libs/sonner'
import { walletConnectOptions } from '@renderer/libs/walletConnectSDK'
import { modalsRouter } from '@renderer/routes/modalsRouter'
import { RootStore } from '@renderer/store/RootStore'
import { QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

import { RootOutlet } from './RootOutlet'

export const RootPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/portfolio')
  }, [navigate])

  return (
    <StoreProvider store={RootStore.store}>
      <PersistGate persistor={RootStore.persistor}>
        <WalletConnectWalletProvider options={walletConnectOptions}>
          <QueryClientProvider client={queryClient}>
            <ModalRouterProvider routes={modalsRouter}>
              <RootOutlet />
              <ToastProvider />
            </ModalRouterProvider>
          </QueryClientProvider>
        </WalletConnectWalletProvider>
      </PersistGate>
    </StoreProvider>
  )
}
