import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

// export type GlobalState = {}
export const INITIAL_STATE = {}

const loggerMiddleware = createLogger()

function configureStore(initialState = INITIAL_STATE) {
  return createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, loggerMiddleware),
  )
}
export const store = configureStore()
