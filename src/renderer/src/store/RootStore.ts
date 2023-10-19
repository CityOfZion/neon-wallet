import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AccountReducer, { accountReducerName } from './account/AccountReducer'
import BlockchainReducer from './blockchain/BlockchainReducer'
import SettingsReducer, { settingsReducerName } from './settings/SettingsReducer'
import WalletReducer, { walletReducerName } from './wallet/WalletReducer'

const persistedWalletReducer = persistReducer({ key: walletReducerName, storage }, WalletReducer)
const persistedAccountReducer = persistReducer({ key: accountReducerName, storage }, AccountReducer)
const persistedSettingsReducer = persistReducer(
  { key: settingsReducerName, storage, blacklist: ['encryptedPassword'] },
  SettingsReducer
)
export class RootStore {
  static reducers = combineReducers({
    wallet: persistedWalletReducer,
    account: persistedAccountReducer,
    settings: persistedSettingsReducer,
    blockchain: BlockchainReducer,
  })

  static store = configureStore({
    reducer: RootStore.reducers,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['blockchain.bsAggregator'],
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ],
  })

  static persistor = persistStore(RootStore.store)
}
