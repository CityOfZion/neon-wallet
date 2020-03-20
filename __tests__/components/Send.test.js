import React from 'react'
import { mount } from 'enzyme'
import { uniqueId } from 'lodash-es'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { progressValues } from 'spunky'

import Send from '../../app/containers/Send/Send'
import ZeroAssets from '../../app/components/ZeroAssets/ZeroAssets'
import SendRecipientListItem from '../../app/components/Send/SendPanel/SendRecipientList/SendRecipientListItem'
import PanelHeaderButton from '../../app/components/PanelHeaderButton/PanelHeaderButton'
import Button from '../../app/components/Button'
import IntlWrapper from '../../app/components/Root/IntlWrapper'
import { DEFAULT_LANGUAGE } from '../../app/core/constants'

const { LOADED, LOADING } = progressValues

const initialState = {
  spunky: {
    settings: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        language: DEFAULT_LANGUAGE,
      },
    },
  },
}

const setup = props => {
  const store = configureStore()(initialState)
  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper>
        <Send
          {...props}
          sendableAssets={{ NEO: { balance: 5, symbol: 'NEO' } }}
          prices={{ NEO: 38 }}
          contacts={{ NeoFriend: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr' }}
          currencyCode="usd"
          shouldRenderHeaderBar={false}
        />{' '}
      </IntlWrapper>
    </Provider>,
  )
  return wrapper
}

const createAsset = (name, id) => ({
  asset: name,
  address: '',
  note: '',
  amount: 0,
  max: 10,
  id,
  errors: {},
})

describe('Send', () => {
  test('It shows ZeroAssets component when no sendable assets is present', () => {
    const wrapper = setup()

    expect(wrapper.find(ZeroAssets)).toBeTruthy()
  })

  test('It does not add a row when you click Add Recipient button and without details for the first row being filled in', () => {
    const wrapper = setup()
    wrapper
      .find(PanelHeaderButton)
      .at(2)
      .simulate('click')
    expect(wrapper.find(Send).instance().state.sendRowDetails.length).toBe(1)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(1)
  })

  test('It does add a row when you click Add Recipient button and details are filled in', () => {
    const wrapper = setup()

    const sendRowDetails = []
    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    asset.address = 'ARU4Sw9yyqgfjxfqF1TNwWHHFvLbAVdTj1'
    asset.id = uniqueId()
    wrapper.find(Send).setState({
      sendRowDetails: [asset],
    })

    wrapper
      .find(PanelHeaderButton)
      .at(2)
      .simulate('click')
    expect(wrapper.find(Send).instance().state.sendRowDetails.length).toBe(2)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(2)
  })

  test('It deletes the correct row when you click the delete icon for that row', () => {
    const wrapper = setup()

    const sendRowDetails = []
    sendRowDetails.push(
      createAsset('NEO', 1),
      createAsset('GAS', 2),
      createAsset('RPX', 3),
    )

    wrapper.find(Send).setState({ sendRowDetails })
    wrapper
      .find('.deleteButton')
      .first()
      .simulate('click')

    const wrapperRows = wrapper.find(Send).instance().state.sendRowDetails

    expect(wrapperRows.length).toBe(2)
    expect(wrapperRows[0].asset).toBe('GAS')
    expect(wrapperRows[1].asset).toBe('RPX')
  })

  // TODO: update this test so that valid values are added
  test('.sendPanelHeaderButton is disabled until details are filled out', () => {
    const wrapper = setup()

    for (let i = 0; i <= 10; i++) {
      wrapper
        .find(PanelHeaderButton)
        .at(2)
        .simulate('click')
    }

    expect(wrapper.find(Send).instance().state.sendRowDetails.length).toBe(1)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(1)
  })

  test('There is no trash icon when only one row is present', () => {
    const wrapper = setup()
    expect(wrapper.find('.deleteButton')).toHaveLength(0)
  })

  test('It validates and sets error in state when you submit empty inputs', () => {
    const wrapper = setup()

    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors

    expect(errors.amount).toBe('Can not send 0 NEO.')
    expect(errors.address).toBe('You need to specify a valid NEO address.')
  })

  test('It does not allow negative amounts', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = -5
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe('You cannot send negative amounts of NEO.')
  })

  test('It does not allow fractional amounts of NEO', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 1.5
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe('You cannot send fractional amounts of NEO.')
  })

  test('It fails when trying to send more than you have', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 100
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe(
      'You do not have enough balance to send 100 NEO.',
    )
  })

  test('It does allow fractional amounts of other assets', () => {
    const wrapper = setup()

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe(undefined)
  })

  test('It does not allow blacklisted addresses', () => {
    const wrapper = setup()

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    asset.address = 'ARU4Sw9yyqgfjxfqF1TNwWHHFvLbAVdTj1'
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    setTimeout(() => {
      const errors = wrapper.find(Send).instance().state.sendRowDetails[0]
        .errors

      expect(errors.address).toBe(
        'Address is blacklisted. This is a known phishing address.',
      )
    }, 0)
  })

  test('It does allow you to send to your own address', () => {
    const wrapper = setup({ address: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr' })

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.find(Send).setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const errors = wrapper.find(Send).instance().state.sendRowDetails[0].errors

    expect(errors.address).toBe(undefined)
  })

  test('It correctly sets max value', () => {
    const wrapper = setup()

    wrapper
      .find('.maxButton')
      .at(1)
      .simulate('click')
    expect(wrapper.find(Send).instance().state.sendRowDetails[0].amount).toBe(
      '5',
    )
  })

  test('It proceeds to the next step with valid input', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 1
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    setTimeout(
      () =>
        expect(wrapper.find(Send).instance().state.showConfirmSend).toBe(true),
      0,
    )
  })

  test('It calls sendTransaction when you click confirm and send', () => {
    const wrapper = setup({ sendTransaction: jest.fn(() => Promise.resolve()) })

    const asset = createAsset('NEO', 1)
    asset.amount = 1
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.setState({ sendRowDetails: [asset] })

    wrapper
      .find('#send-assets')
      .find(Button)
      .props()
      .onClick()

    const sendTransaction = wrapper.find(Send).instance().props.sendTransaction

    setTimeout(() => {
      expect(sendTransaction).toHaveBeenCalledTimes(1)
      expect(sendTransaction).toHaveBeenCalledWith([
        {
          address: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr',
          amount: 1,
          note: '',
          symbol: 'NEO',
        },
      ])
    }, 0)
  })
})
