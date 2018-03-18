import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { saga } from 'spunky'

import rootReducer from '../modules'

function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [
    sagaMiddleware,
    thunk
  ]

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(saga)

  return store
}

export default configureStore()
