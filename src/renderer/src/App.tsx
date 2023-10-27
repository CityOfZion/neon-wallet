import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { ModalRouterProvider } from './contexts/ModalRouterContext'
import { modalRoutes } from './routes/modals'
import { pageRouter } from './routes/pages'
import { RootStore } from './store/RootStore'

export const App = (): JSX.Element => {
  return (
    <StoreProvider store={RootStore.store}>
      <PersistGate persistor={RootStore.persistor}>
        <ModalRouterProvider routes={modalRoutes}>
          <RouterProvider router={pageRouter} />
        </ModalRouterProvider>
      </PersistGate>
    </StoreProvider>
  )
}
