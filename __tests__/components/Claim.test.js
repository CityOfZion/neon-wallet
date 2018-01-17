import React from 'react'
import * as neonjs from 'neon-js'
import { cloneDeep } from 'lodash'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'

import Claim from '../../app/containers/Claim'
import { setClaimRequest, disableClaim } from '../../app/modules/claim'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATIONS, DEFAULT_POSITION } from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS, MAIN_NETWORK_ID } from '../../app/core/constants'
import { LOADED } from '../../app/values/state'

const initialState = {
  api: {
    NETWORK: {
      batch: false,
      state: LOADED,
      data: MAIN_NETWORK_ID
    },
    SETTINGS: {
      batch: false,
      state: LOADED,
      data: {}
    }
  },
  claim: {
    claimAmount: 10,
    claimRequest: false,
    claimWasUpdated: false,
    disableClaimButton: false
  },
  account: {
    wif: 'wif',
    address: 'address'
  },
  wallet: {
    NEO: '1'
  }
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<Claim store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <Claim />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('Claim', () => {
  test('should render without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('should render claim GAS button when claim button is not disabled', () => {
    const { wrapper } = setup()
    expect(wrapper.dive()).toMatchSnapshot()
  })

  test('should not render claim GAS button when claim button is disabled', () => {
    const newState = cloneDeep(initialState)
    newState.claim.disableClaimButton = true
    const { wrapper } = setup(newState)
    expect(wrapper.dive()).toMatchSnapshot()
  })

  describe('when do GAS claim button is clicked', () => {
    test('should dispatch transaction failure event', async () => {
      const { wrapper, store } = setup()
      neonjs.api.neonDB.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: undefined })
        })
      })
      wrapper.dive().find('#claim').simulate('click')

      await Promise.resolve().then().then().then()
      const actions = store.getActions()
      expect(actions.length).toEqual(4)
      expect(actions[0]).toEqual({
        type: HIDE_NOTIFICATIONS,
        payload: expect.objectContaining({
          dismissible: true,
          position: DEFAULT_POSITION
        })
      })
      expect(actions[1]).toEqual({
        type: SHOW_NOTIFICATION,
        payload: expect.objectContaining({
          message: 'Sending NEO to Yourself...',
          level: NOTIFICATION_LEVELS.INFO
        })
      })
      expect(actions[2]).toEqual({
        type: HIDE_NOTIFICATIONS,
        payload: expect.objectContaining({
          dismissible: true,
          position: DEFAULT_POSITION
        })
      })
      expect(actions[3]).toEqual({
        type: SHOW_NOTIFICATION,
        payload: expect.objectContaining({
          message: 'Transaction failed!',
          level: NOTIFICATION_LEVELS.ERROR
        })
      })
    })

    test('should dispatch transaction waiting, set claim request and disable claim event', async () => {
      const { wrapper, store } = setup()
      neonjs.api.neonDB.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: true })
        })
      })

      wrapper.dive().find('#claim').simulate('click')

      await Promise.resolve().then().then().then()
      const actions = store.getActions()
      expect(actions.length).toEqual(6)
      expect(actions[0]).toEqual({
        type: HIDE_NOTIFICATIONS,
        payload: expect.objectContaining({
          dismissible: true,
          position: DEFAULT_POSITION
        })
      })
      expect(actions[1]).toEqual({
        type: SHOW_NOTIFICATION,
        payload: expect.objectContaining({
          message: 'Sending NEO to Yourself...',
          level: NOTIFICATION_LEVELS.INFO
        })
      })

      expect(actions[2]).toEqual({
        type: HIDE_NOTIFICATIONS,
        payload: expect.objectContaining({
          dismissible: true,
          position: DEFAULT_POSITION
        })
      })
      expect(actions[3]).toEqual({
        type: SHOW_NOTIFICATION,
        payload: expect.objectContaining({
          message: 'Waiting for transaction to clear...',
          level: NOTIFICATION_LEVELS.INFO
        })
      })
      expect(actions[4]).toEqual(setClaimRequest(true))
      expect(actions[5]).toEqual(disableClaim(true))
    })
  })
})
