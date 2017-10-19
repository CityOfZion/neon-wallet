import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'

import { login } from '../../app/modules/account'

import { sendEvent } from '../../app/modules/transactions'
import { KEYS } from '../../app/core/constants'

import Login from '../../app/containers/LoginPrivateKey/LoginPrivateKey'

const setup = (state = { account: {
  loggedIn: true,
  wif: undefined
}}) => {
  const store = configureStore()(state)
  const wrapper = shallow(<Login store={store} />)

  return {
    store,
    wrapper
  }
}

const state = {
  account: {
    loggedIn: false,
    wif: null
  }
}

describe('Login', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('clicking show key icon toggles private key visibility', () => {
    const { wrapper } = setup()

    expect(wrapper.state('showKey')).toEqual(false)

    wrapper
      .find('.viewKey')
      .simulate('click')

    expect(wrapper.state('showKey')).toEqual(true)
  })

  test('pressing enter on passphrase input field triggers sendEvent', () => {
    const store = configureStore()(state)
    const wrapper = mount(<Login store={store} />)
    const c = wrapper.find('input')

    // console.log('debug:'+c.debug())
    // console.log('debug2:'+c.html())
    c.simulate('keyDown', { key: KEYS.ENTER })
    expect(store.getActions()[0]).toEqual(sendEvent(false, 'That is not a valid private key'))
  })

  test('private key field input onChange dispatches LOGIN action', () => {
    const history = {
      push: jest.fn()
    }

    const store = configureStore()(state)
    const wrapper = mount(<Login store={store} history={history} />)
    const c = wrapper.find('input')

    c.instance().value = 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'
    c.simulate('change')
    wrapper.find('.loginButton').simulate('click')

    expect(store.getActions()[0]).toEqual(login('L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'))
  })

  // test('private key field input onChange dispatches LOGIN action', () => {
  //   const { store, wrapper } = setup();
  //   let preventDefault = jest.fn();
  //   const deeperWrapper = wrapper.shallow();
  //
  //   const someWif = 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'
  //   deeperWrapper
  //     .find('input')
  //     .simulate('change', { target: { value: someWif } })
  //     .find('button')
  //     .simulate('click');
  //
  //   expect(store.getActions()).toEqual([
  //     { wif: someWif, type: 'LOGIN' }
  //   ]);
  // });
})
