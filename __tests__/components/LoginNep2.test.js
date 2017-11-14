import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import LoginNep2 from '../../app/containers/LoginNep2'
import { decryptWIF } from 'neon-js'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATIONS, HIDE_NOTIFICATION, DEFAULT_POSITION } from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS } from '../../app/core/constants'

jest.useFakeTimers()
jest.mock('neon-js')

const setup = (shallowRender = true) => {
  const store = configureStore([thunk])({})

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<LoginNep2 store={store} />)
  } else {
    const history = createMemoryHistory('/dashboard')
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LoginNep2 history={history} />
        </BrowserRouter>
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('LoginNep2', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })
  test('renders correctly with initial state', (done) => {
    const { wrapper } = setup(false)

    const passwordField = wrapper.find('input[type="password"]')
    const keyField = wrapper.find('input[type="text"]')

    expect(passwordField.text()).toEqual('')
    expect(passwordField.html().includes('Enter your passphrase here')).toEqual(true)
    expect(keyField.text()).toEqual('')
    expect(keyField.html().includes('Enter your encrypted key here')).toEqual(true)
    done()
  })
  test('the login button is working correctly with no passphrase or wif', (done) => {
    const { wrapper, store } = setup(false)

    wrapper.find('.loginButton').simulate('click')
    Promise.resolve('pause').then(() => {
      const actions = store.getActions()
      expect(actions.length).toEqual(0)
      done()
    })
  })
  // test('the login button is working correctly with only a short passphrase', (done) => {
  //   const { wrapper, store } = setup(false)

  //   const passwordField = wrapper.find('input[placeholder="Enter your passphrase here"]')
  //   passwordField.instance().value = 'T'
  //   passwordField.simulate('change')

  //   const keyField = wrapper.find('input[placeholder="Enter your encrypted key here"]')
  //   keyField.instance().value = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'
  //   keyField.simulate('change')

  //   wrapper.find('.loginButton').simulate('click')

  //   Promise.resolve('pause').then(() => {
  //     jest.runAllTimers()
  //     const actions = store.getActions()
  //     expect(actions.length).toEqual(2)
  //     expect(actions[0]).toEqual({
  //       type: SEND_TRANSACTION,
  //       success: false,
  //       message: 'Passphrase too short'
  //     })
  //     expect(actions[1]).toEqual({
  //       type: CLEAR_TRANSACTION
  //     })
  //     done()
  //   })
  // })
  test('the login button is working correctly with key and passphrase', (done) => {
    const { wrapper, store } = setup(false)

    const passwordField = wrapper.find('input[placeholder="Enter your passphrase here"]')
    passwordField.instance().value = 'Th!s1$@FakePassphrase'
    passwordField.simulate('change')

    const keyField = wrapper.find('input[placeholder="Enter your encrypted key here"]')
    keyField.instance().value = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'
    keyField.simulate('change')

    wrapper.find('.loginButton').simulate('click')
    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length).toEqual(2)
    expect(decryptWIF.mock.calls.length).toBe(1)
    expect(decryptWIF.mock.calls[0][0]).toBe('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu')
    expect(actions[0]).toEqual({
      type: HIDE_NOTIFICATIONS,
      payload: {
        dismissible: true,
        position: DEFAULT_POSITION
      }
    })
    expect(actions[1]).toEqual({
      type: SHOW_NOTIFICATION,
      payload: expect.objectContaining({
        message: 'Decrypting encoded key...',
        level: NOTIFICATION_LEVELS.INFO
      })
    })
    done()
  })
})
