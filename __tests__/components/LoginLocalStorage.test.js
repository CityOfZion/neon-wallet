import React from 'react'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import LoginLocalStorage from '../../app/components/LoginLocalStorage'
import { sendEvent } from '../../app/modules/transactions'

const state = {
  showKey: false,
  account: {
    loggedIn: false,
    wif: null,
    accountKeys: ['test']
  },
  decrypting: false
}

describe('LoginLocalStorage', () => {
  test('should render without crashing', () => {
    const store = configureStore()(state)
    const wrapper = mount(<LoginLocalStorage store={store} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('pressing enter on passphrase input field triggers sendEvent', () => {
    const store = configureStore()(state)
    const wrapper = mount(<LoginLocalStorage store={store} />)

    const c = wrapper.find('.passPhrase')
    // console.log('debug:'+c.debug())
    // console.log('debug2:'+c.html())
    c.simulate('keyDown', { key: 'Enter' })
    expect(store.getActions()[0]).toEqual(sendEvent(false, 'Passphrase too short'))
  })

  test('entering data on passphrase input field triggers sendEvent with long enough passphrase', () => {
    const store = configureStore()(state)
    const wrapper = mount(<LoginLocalStorage store={store} />)
    const c = wrapper.find('.passPhrase')
    c.instance().value = 'testing'
    c.simulate('change')
    c.simulate('keyDown', { key: 'Enter' })
    expect(store.getActions()[0]).toEqual(sendEvent(false, 'Please select a wallet'))
  })

  test('entering data on passphrase input field triggers sendEvent with wallet selected', () => {
    const store = configureStore()(state)
    const wrapper = mount(<LoginLocalStorage store={store} />)

    // any fictional index will do
    wrapper.find('select').instance().selectedIndex = 1

    const c = wrapper.find('.passPhrase')
    c.instance().value = 'testing'
    c.simulate('change')
    c.simulate('keyDown', { key: 'Enter' })
    expect(store.getActions()[0]).toEqual(sendEvent(true, 'Decrypting encoded key...'))
  })
})
