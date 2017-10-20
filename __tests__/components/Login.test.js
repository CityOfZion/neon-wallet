import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import { login, onWifChange } from '../../app/modules/account'
import { sendEvent } from '../../app/modules/transactions'
import { KEYS } from '../../app/core/constants'
import Login from '../../app/containers/LoginPrivateKey'

const setup = (state = { account: {
  loggedIn: true,
  wif: undefined
}}) => {
  const store = configureStore([thunk])(state)
  // store.dispatch = jest.fn()
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
  },
  wif: ''
  // dispatch: jest.fn()
}

describe('Login', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('clicking show key icon toggles private key visibility', () => {
    const { store, wrapper } = setup()
    const state = store.getState()
    expect(wrapper.state('showKey')).toEqual(false)

    wrapper
      .find('.viewKey')
      .simulate('click')

    expect(wrapper.state('showKey')).toEqual(true)
  })

  test('pressing enter on passphrase input field triggers sendEvent', () => {
    const store = configureStore()(state)
    const dispatch = jest.fn()
    const wrapper = mount(<Login store={store} />)
    const c = wrapper.find('.passInput')

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

    const wrapper = mount(<Login store={store} history={history} onWifChange={onWifChange}  />)
    const c = wrapper.find('.passInput')

    c.instance().value = 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'
    c.simulate('change')
    wrapper.find('.loginButton').simulate('click')

    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'dispatch')

      instance.forceUpdate();
    // expect(c.find('.passInput').prop('value')).toEqual('L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A')

    // expect(store.getActions()[0]).toEqual(login('L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'))
    // expect(store.getActions()[0]).toEqual(login('L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'))
    expect(store.dispatch).toHaveBeenCalled()
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
