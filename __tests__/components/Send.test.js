import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import { TOGGLE_SEND_PANE } from '../../app/modules/dashboard'
import { CLEAR_TRANSACTION, SEND_TRANSACTION, TOGGLE_ASSET } from '../../app/modules/transactions'
import Send from '../../app/components/Send'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

jest.useFakeTimers()
jest.mock('neon-js')

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
  const store = configureStore()(state)

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

  test('sendAsset button is getting called correctly with no address or amount sent', (done) => {
    const { wrapper, store } = setup(initialState, false)
    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 0).toEqual(true)
    done()
  })

  test('sendAsset button is getting called correctly with invalid address', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress('This-is-an-invalid-address', wrapper)
    changeAmount(initialState.wallet.Neo, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 2).toEqual(true)
    expect(actions[0]).toEqual({
      type: SEND_TRANSACTION,
      success: false,
      message: 'The address you entered was not valid.'
    })
    expect(actions[1]).toEqual({
      type: CLEAR_TRANSACTION
    })
    done()
  })

  test('sendAsset button is getting called correctly with fractional NEO', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Neo + 0.5, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 2).toEqual(true)
    expect(actions[0]).toEqual({
      type: SEND_TRANSACTION,
      success: false,
      message: 'You cannot send fractional amounts of Neo.'
    })
    expect(actions[1]).toEqual({
      type: CLEAR_TRANSACTION
    })
    done()
  })

  test('sendAsset button is getting called correctly with no NEO amount', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 0).toEqual(true)
    done()
  })

  test('sendAsset button is getting called correctly with not enough NEO', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Neo + 1, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 2).toEqual(true)
    expect(actions[0]).toEqual({
      type: SEND_TRANSACTION,
      success: false,
      message: 'You do not have enough NEO to send.'
    })
    expect(actions[1]).toEqual({
      type: CLEAR_TRANSACTION
    })
    done()
  })

  test('sendAsset button is getting called correctly with negative NEO', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(-1, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 2).toEqual(true)
    expect(actions[0]).toEqual({
      type: SEND_TRANSACTION,
      success: false,
      message: 'You cannot send negative amounts of an asset.'
    })
    expect(actions[1]).toEqual({
      type: CLEAR_TRANSACTION
    })
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
      pane: 'confirmPane'
    })
    done()
  })

  test('sendAsset button is getting called correctly for without enough Gas', (done) => {
    const gasState = Object.assign({}, initialState, { transactions: { selectedAsset: 'Gas' } })
    const { wrapper, store } = setup(gasState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Gas + 1, wrapper)

    wrapper.find('#doSend').simulate('click')

    jest.runAllTimers()
    const actions = store.getActions()
    expect(actions.length === 2).toEqual(true)
    expect(actions[0]).toEqual({
      type: SEND_TRANSACTION,
      success: false,
      message: 'You do not have enough GAS to send.'
    })
    expect(actions[1]).toEqual({
      type: CLEAR_TRANSACTION
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
      pane: 'confirmPane'
    })
    done()
  })

  test('send transaction is working correctly', (done) => {
    const { wrapper, store } = setup(initialState, false)

    changeAddress(initialState.account.address, wrapper)
    changeAmount(initialState.wallet.Neo - 1, wrapper)

    wrapper.find('#confirmPane').simulate('click')

    Promise.resolve('pause').then(() => {
      jest.runAllTimers()
      const actions = store.getActions()
      expect(actions.length === 4).toEqual(true)
      expect(actions[0]).toEqual({
        type: SEND_TRANSACTION,
        success: true,
        message: 'Processing...'
      })
      expect(actions[1]).toEqual({
        type: TOGGLE_SEND_PANE,
        pane: 'confirmPane'
      })
      expect(actions[2]).toEqual({
        type: SEND_TRANSACTION,
        success: true,
        message: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.'
      })
      expect(actions[3]).toEqual({
        type: CLEAR_TRANSACTION
      })
      done()
    }).catch(e => done.fail(e))
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
