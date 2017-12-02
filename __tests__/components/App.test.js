import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import storage from 'electron-json-storage'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import App from '../../app/containers/App'

const setup = (state, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<App store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

  return { wrapper, store }
}

describe('App', () => {
  test('app initializes settings', (done) => {
    storage.get = jest.fn((settingsKey, callback) => {
      expect(settingsKey).toEqual('settings')
      done()
    })
    setup({ modal: {} }, false)
  })
})
