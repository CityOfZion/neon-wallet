import React from 'react'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import poll from '../app/util/poll'

export const createStore = configureStore([thunk])

export const provideState = (node, initialState = {}) => {
  const store = createStore(initialState)
  return provideStore(node, store)
}

export const provideStore = (node, store) => {
  return <Provider store={store}>{node}</Provider>
}

export const mockPromiseResolved = result =>
  jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(result)
    })
  })

export const mockPromiseRejected = (message = 'test error') =>
  jest.fn(() => {
    return new Promise((resolve, reject) => {
      reject(new Error(message))
    })
  })

// polls for an enzyme element existence for 2s
export const waitForElement = async (
  wrapper,
  selector,
  config = { attempts: 10, frequency: 200 },
) => {
  const findElement = async () => {
    const element = wrapper.update().find(selector)
    return element.length
      ? Promise.resolve(element.get(0))
      : Promise.reject('Element not found')
  }
  return poll(findElement, config)
}
