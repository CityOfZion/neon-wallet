import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'

import LoginNep2 from '../../app/containers/LoginNep2'

jest.useFakeTimers()

const setup = (shallowRender = true) => {
  const store = configureStore([thunk])({})

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<LoginNep2 store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginNep2 />
        </MemoryRouter>
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

    const fields = wrapper.find('input[type="password"]')
    expect(fields.length).toEqual(2)

    const keyField = fields.get(0)
    const passwordField = fields.get(1)

    expect(keyField.props.value).toEqual('')
    expect(keyField.props.placeholder).toEqual(('Enter your encrypted key here'))
    expect(keyField.props.type).toEqual('password')
    expect(passwordField.props.value).toEqual('')
    expect(passwordField.props.placeholder).toEqual('Enter your passphrase here')
    expect(passwordField.props.type).toEqual('password')
    done()
  })

  test('the login button is working correctly with no passphrase or wif', (done) => {
    const { wrapper, store } = setup(false)

    wrapper.find('#loginButton').hostNodes().simulate('click')
    Promise.resolve('pause').then(() => {
      const actions = store.getActions()
      expect(actions.length).toEqual(0)
      done()
    })
  })

  test('the login button is working correctly with key and passphrase', () => {
    const { wrapper, store } = setup(false)

    const passwordField = wrapper.find('input[placeholder="Enter your passphrase here"]')
    passwordField.instance().value = 'Th!s1$@FakePassphrase'
    passwordField.simulate('change')

    const keyField = wrapper.find('input[placeholder="Enter your encrypted key here"]')
    keyField.instance().value = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'
    keyField.simulate('change')

    wrapper.find('#loginButton').hostNodes().simulate('submit')

    const actions = store.getActions()
    expect(actions.length).toEqual(1)
    expect(actions[0].type).toEqual('AUTH/ACTION/CALL')
  })
})
