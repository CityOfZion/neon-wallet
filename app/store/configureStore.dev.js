import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'

import logger from 'redux-logger'

export default function configureStore (initialState) {
  const middlewares = [
    thunk,
    logger
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(

      applyMiddleware(...middlewares),

      DevTools.instrument()
    )
  )

  return store
}
