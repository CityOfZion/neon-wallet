import React from 'react'
import { cloneDeep } from 'lodash'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import Claim from '../../app/containers/Claim'
import * as neonjs from 'neon-js'
import { setClaimRequest, disableClaim } from '../../app/modules/claim'
import { showInfoNotification, showErrorNotification } from '../../app/modules/notification'

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
    test('should dispatch transaction failure event', (done) => {
      const { wrapper, store } = setup()
      const response = Promise.resolve('pause')
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: undefined })
        })
      })
      wrapper.dive().find('#claim button').simulate('click')

      response.then(() => {
        const actions = store.getActions()
        expect(actions.length).toEqual(2)
        expect(actions[0]).toEqual(showInfoNotification({ message: 'Sending Neo to Yourself...', dismissible: false }))
        expect(actions[1]).toEqual(showErrorNotification({ message: 'Transaction failed!' }))
        done()
      })
    })

    test('should dispatch transaction waiting, set claim request and disable claim event', (done) => {
      const { wrapper, store } = setup()
      const response = Promise.resolve('pause')
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: true })
        })
      })

      wrapper.dive().find('#claim button').simulate('click')

      response.then(() => {
        const actions = store.getActions()
        expect(actions.length).toEqual(4)
        expect(actions[0]).toEqual(showInfoNotification({ message: 'Sending Neo to Yourself...', dismissible: false }))
        expect(actions[1]).toEqual(showInfoNotification({ message: 'Waiting for transaction to clear...', dismissible: false }))
        expect(actions[2]).toEqual(setClaimRequest(true))
        expect(actions[3]).toEqual(disableClaim(true))
        done()
      })
    })
  })

  // describe('when claim is requested and updated', () => {
  //   const newState = cloneDeep(initialState)
  //   newState.claim.claimRequest = true
  //   newState.claim.claimWasUpdated = true
  //   newState.dispatch = jest.fn()
  //
  //   test('should dispatch false claim request and claim successful event', (done) => {
  //     const { wrapper, store } = setup(newState, false)
  //     const response = Promise.resolve('pause')
  //     neonjs.doClaimAllGas = jest.fn(() => {
  //       return new Promise((resolve, reject) => {
  //         resolve({ result: true })
  //       })
  //     })
  //     wrapper.setProps({ target: '' })
  //
  //     response.then(() => {
  //       const actions = store.getActions()
  //       expect(actions.length).toEqual(2)
  //       expect(actions[0]).toEqual(setClaimRequest(false))
  //       expect(actions[1]).toEqual(showSuccessNotification({ message: 'Claim was successful! Your balance will update once the blockchain has processed it.', dismissAfter: 300000 }}))
  //       done()
  //     })
  //   })
  //
  //   test('should dispatch false claim request and claim failure event', (done) => {
  //     const { wrapper, store } = setup(newState, false)
  //     const response = Promise.resolve('pause')
  //     neonjs.doClaimAllGas = jest.fn(() => {
  //       return new Promise((resolve, reject) => {
  //         resolve({ result: false })
  //       })
  //     })
  //     wrapper.setProps({ target: '' })
  //
  //     response.then(() => {
  //       jest.runAllTimers()
  //       const actions = store.getActions()
  //       expect(actions.length).toEqual(2)
  //       expect(actions[0]).toEqual(setClaimRequest(false))
  //       expect(actions[1]).toEqual(showErrorNotification({ message: 'Claim failed' }))
  //       done()
  //     })
  //   })
  // })
})
