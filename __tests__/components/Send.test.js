import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import { TOGGLE_SEND_PANE } from '../../app/modules/dashboard'
import { TOGGLE_ASSET } from '../../app/modules/transactions'
import { SHOW_NOTIFICATION } from '../../app/modules/notification'
import Send from '../../app/containers/Send'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
axiosMock.onAny().reply(200)

const initialState = {
  account: {
    wif: 'L4SLRcPgqNMAMwM3nFSxnh36f1v5omjPg3Ewy1tg2PnEon8AcHou',
    address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh'
  },
  metadata: {
    network: 'TestNet'
  },
  wallet: {
    Neo: 5,
    Gas: 1
  },
  transactions: {
    selectedAsset: 'Neo'
  },
  dashboard: {
    confirmPane: true
  }
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<Send store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <Send />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

const changeAmount = (amount, wrapper) => {
  const amountField = wrapper.find('input[placeholder="Amount"]')
  amountField.instance().value = amount
  amountField.simulate('change')
}

const changeAddress = (address, wrapper) => {
  const addressField = wrapper.find('input[placeholder="Where to send the asset (address)"]')
  addressField.instance().value = address
  addressField.simulate('change')
}

describe('Send', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('toggleAsset button is getting called on click', (done) => {
    const { wrapper, store } = setup()
    const deepWrapper = wrapper.dive()

    deepWrapper.find('#sendAsset').simulate('click')

    const actions = store.getActions()
    expect(actions.length === 1).toEqual(true)
    expect(actions[0].type === TOGGLE_ASSET).toEqual(true)
    done()
  })

  test('sendAsset button is getting called correctly with correct NEO amount', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Neo - 1, wrapper)

    wrapper.find('#doSend').simulate('click')

    const actions = store.getActions()
    expect(actions.length === 1).toEqual(true)
    expect(actions[0]).toEqual({
      type: TOGGLE_SEND_PANE,
      payload: {
        pane: 'confirmPane'
      }
    })
    done()
  })

  test('sendAsset button is getting called correctly with correct Gas amount', (done) => {
    const gasState = Object.assign({}, initialState, { transactions: { selectedAsset: 'Gas' } })
    const { wrapper, store } = setup(gasState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Gas - 0.5, wrapper)

    wrapper.find('#doSend').simulate('click')

    const actions1 = store.getActions()
    expect(actions1.length === 1).toEqual(true)
    expect(actions1[0]).toEqual({
      type: TOGGLE_SEND_PANE,
      payload: {
        pane: 'confirmPane'
      }
    })
    done()
  })

  test('send transaction is working correctly', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Neo - 1, wrapper)

    wrapper.find('#confirmPane').simulate('click')

    setTimeout(() => {
      try {
        const actions = store.getActions()
        expect(actions.length).toEqual(3)
        expect(actions[0]).toEqual({
          type: SHOW_NOTIFICATION,
          payload: {
            message: 'Processing...',
            type: 'INFO'
          }
        })
        expect(actions[1]).toEqual({
          type: SHOW_NOTIFICATION,
          payload: {
            message: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.',
            type: 'SUCCESS'
          }
        })
        expect(actions[2]).toEqual({
          type: TOGGLE_SEND_PANE,
          payload: { pane: 'confirmPane' }
        })
        done()
      } catch (e) {
        done.fail(e)
      }
    }, 0)
  })

  test('component is rendering correctly', (done) => {
    const { wrapper } = setup()
    const deepWrapper = wrapper.dive()

    const checkElements = [
      {
        element: deepWrapper.find('#sendAsset'),
        text: 'Neo'
      },
      {
        element: deepWrapper.find('#sendAmount'),
        text: ''
      },
      {
        element: deepWrapper.find('#sendAddress'),
        text: ''
      },
      {
        element: deepWrapper.find('#doSend'),
        text: 'Send Asset'
      },
      {
        element: deepWrapper.find('#confirmPane'),
        text: 'Confirm Transaction'
      }
    ]

    checkElements.forEach(item => {
      expect(item.element.length).toEqual(1)
      expect(item.element.text()).toEqual(item.text)
    })
    done()
  })
})
