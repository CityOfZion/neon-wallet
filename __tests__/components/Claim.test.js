import React from 'react'
import { cloneDeep } from 'lodash'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import Claim from '../../app/containers/Claim'
import * as neonjs from 'neon-js'
import { setClaimRequest, disableClaim } from '../../app/modules/claim'

const initialState = {
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
  metadata: {
    network: 'network'
  },
  wallet: {
    Neo: 1
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

  test('should render claim gas button when claim button is not disabled', () => {
    const { wrapper } = setup()
    expect(wrapper.dive()).toMatchSnapshot()
  })

  test('should not render claim gas button when claim button is disabled', () => {
    const newState = cloneDeep(initialState)
    newState.claim.disableClaimButton = true
    const { wrapper } = setup(newState)
    expect(wrapper.dive()).toMatchSnapshot()
  })

  describe('when do gas claim button is clicked', () => {
    test('should dispatch transaction failure event', async (done) => {
      const { wrapper, store } = setup()
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: undefined })
        })
      })
      wrapper.dive().find('#claim button').simulate('click')

      await Promise.resolve().then().then().then()
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({
        payload: {
          message: 'Sending Neo to Yourself...',
          type: 'INFO'
        },
        type: 'SHOW_NOTIFICATION'
      })
      expect(actions[1]).toEqual({
        payload: {
          message: 'Transaction failed!',
          type: 'ERROR'
        },
        type: 'SHOW_NOTIFICATION'
      })
      done()
    })

    test('should dispatch transaction waiting, set claim request and disable claim event', async (done) => {
      const { wrapper, store } = setup()
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: true })
        })
      })

      wrapper.dive().find('#claim button').simulate('click')

      await Promise.resolve().then().then().then()
      const actions = store.getActions()
      expect(actions.length).toEqual(4)
      expect(actions[0]).toEqual({
        payload: {
          message: 'Sending Neo to Yourself...',
          type: 'INFO'
        },
        type: 'SHOW_NOTIFICATION'
      })
      expect(actions[1]).toEqual({
        payload: {
          message: 'Waiting for transaction to clear...',
          type: 'INFO'
        },
        type: 'SHOW_NOTIFICATION'
      })
      expect(actions[2]).toEqual(setClaimRequest(true))
      expect(actions[3]).toEqual(disableClaim(true))
      done()
    })
  })
})
