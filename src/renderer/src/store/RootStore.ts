import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  // persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

export class RootStore {
  static reducers = combineReducers({})

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
