import React from 'react'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

export const createStore = configureStore([thunk])

export const provideState = (node, initialState = {}) => {
  const store = createStore(initialState)
  return provideStore(node, store)
}

export const provideStore = (node, store) => {
  return <Provider store={store}>{node}</Provider>
}
