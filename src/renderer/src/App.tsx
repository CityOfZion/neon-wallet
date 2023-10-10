import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { RootStore } from './store/RootStore'
// import { PersistGate } from 'redux-persist/integration/react'
import { router } from './routes'

export const App = (): JSX.Element => {
  return (
    <StoreProvider store={RootStore.store}>
      {/* <PersistGate persistor={RootStore.persistor}> */}
      <RouterProvider router={router} />
      {/* </PersistGate> */}
    </StoreProvider>
  )
}
