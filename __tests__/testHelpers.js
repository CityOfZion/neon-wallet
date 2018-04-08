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

export const mockPromiseResolved = (result) => jest.fn(() => {
  return new Promise((resolve, reject) => { resolve(result) })
})

export const mockPromiseRejected = (message = 'test error') => jest.fn(() => {
  return new Promise((resolve, reject) => { reject(new Error(message)) })
})
