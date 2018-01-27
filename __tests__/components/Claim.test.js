import React from 'react'
import * as neonjs from 'neon-js'
import { merge } from 'lodash'
import { mount } from 'enzyme'

import { createStore, provideStore } from '../testHelpers'
import Claim from '../../app/containers/Claim'
import { setClaimRequest, disableClaim } from '../../app/modules/claim'
import { SHOW_NOTIFICATION } from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS, MAIN_NETWORK_ID } from '../../app/core/constants'
import { LOADED } from '../../app/values/state'

jest.useFakeTimers()

const initialState = {
  api: {
    NETWORK: {
      batch: false,
      state: LOADED,
      data: MAIN_NETWORK_ID
    },
    CLAIMS: {
      batch: false,
      state: LOADED,
      data: {
        total: '0.01490723'
      }
    },
    BALANCES: {
      batch: false,
      state: LOADED,
      data: {
        NEO: '10',
        GAS: '10.00000000'
      }
    }
  },
  claim: {
    claimRequest: false,
    disableClaimButton: false
  }
}

const simulateSendAsset = (result) => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({ result })
    })
  })
}

describe('Claim', () => {
  test('should render without crashing', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<Claim />, store))
    expect(wrapper).toMatchSnapshot()
  })

  test('should render claim GAS button as enabled', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<Claim />, store))
    expect(wrapper).toMatchSnapshot()
  })

  test('should render claim GAS button as disabled', () => {
    const state = merge({}, initialState, { claim: { disableClaimButton: true } })
    const store = createStore(state)
    const wrapper = mount(provideStore(<Claim />, store))
    expect(wrapper).toMatchSnapshot()
  })

  describe('when claim GAS button is clicked', () => {
    test('should dispatch transaction failure event', async (done) => {
      const store = createStore(initialState)
      const wrapper = mount(provideStore(<Claim />, store))
      neonjs.api.neonDB.doSendAsset = simulateSendAsset(false)

      wrapper.find('button#claim').simulate('click')
      jest.runAllTimers()
      await Promise.resolve().then().then().then()

      const actions = store.getActions()

      expect(actions).toContainEqual(expect.objectContaining({
        type: SHOW_NOTIFICATION,
        payload: expect.objectContaining({
          level: NOTIFICATION_LEVELS.ERROR,
          message: 'Transaction failed!'
        })
      }))
      done()
    })

    test('should dispatch transaction waiting, set claim request, and disable claim events', async (done) => {
      const store = createStore(initialState)
      const wrapper = mount(provideStore(<Claim />, store))
      neonjs.api.neonDB.doSendAsset = simulateSendAsset(true)

      wrapper.find('button#claim').simulate('click')
      jest.runAllTimers()
      await Promise.resolve().then().then().then()

      const actions = store.getActions()

      expect(actions).toContainEqual(setClaimRequest(true))
      expect(actions).toContainEqual(disableClaim(true))
      done()
    })
  })
})
