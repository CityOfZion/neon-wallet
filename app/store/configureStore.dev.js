import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import DevTools from '../containers/DevTools'
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
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument()
    )
  )

  return store
}

const store = configureStore()
export default store
