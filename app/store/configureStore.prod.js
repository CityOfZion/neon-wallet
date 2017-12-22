import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
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
