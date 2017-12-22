import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

function configureStore (initialState) {
  const logger = createLogger({
    collapsed: true
  })

  const middlewares = [
    thunk,
    logger
  ]

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )

  return store
}

const store = configureStore()
export default store
