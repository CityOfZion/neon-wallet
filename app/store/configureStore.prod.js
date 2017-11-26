import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../modules'
import thunk from 'redux-thunk'

function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}

const store = configureStore()
export default store
