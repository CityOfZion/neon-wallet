import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootReducer from '../modules'
import saga from '../sagas'

function configureStore (initialState = {}) {
  const logger = createLogger({
    collapsed: true
  })

  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [
    sagaMiddleware,
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

  sagaMiddleware.run(saga)

  return store
}

export default configureStore()
