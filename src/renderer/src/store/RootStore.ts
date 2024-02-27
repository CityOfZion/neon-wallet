import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AccountReducer, { accountReducerName } from './reducers/AccountReducer'
import ContactReducer, { contactReducerName } from './reducers/ContactReducer'
import SettingsReducer, { settingsReducerName } from './reducers/SettingsReducer'
import WalletReducer, { walletReducerName } from './reducers/WalletReducer'

const persistedWalletReducer = persistReducer({ key: walletReducerName, storage }, WalletReducer)
const persistedAccountReducer = persistReducer({ key: accountReducerName, storage }, AccountReducer)
const persistedSettingsReducer = persistReducer(
  { key: settingsReducerName, storage, blacklist: ['encryptedPassword'] },
  SettingsReducer
)
const persistedContactReducer = persistReducer({ key: contactReducerName, storage }, ContactReducer)
export class RootStore {
  static reducers = combineReducers({
    wallet: persistedWalletReducer,
    account: persistedAccountReducer,
    settings: persistedSettingsReducer,
    contact: persistedContactReducer,
  })

  static store = configureStore({
    reducer: RootStore.reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  static persistor = persistStore(RootStore.store)
}
