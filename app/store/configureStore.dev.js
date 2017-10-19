import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'
<<<<<<< HEAD
=======

>>>>>>> 6ea66d59ec0cdcea15f13a2fcddac2cc0529d062
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
<<<<<<< HEAD
      applyMiddleware(...middlewares),
=======

      applyMiddleware(...middlewares),

>>>>>>> 6ea66d59ec0cdcea15f13a2fcddac2cc0529d062
      DevTools.instrument()
    )
  )

  return store
}
