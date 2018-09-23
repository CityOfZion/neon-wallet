import React from 'react'
import { mount } from 'enzyme'

import Send from '../../app/containers/Send/Send'
import ZeroAssets from '../../app/components/ZeroAssets/ZeroAssets'
import SendRecipientListItem from '../../app/components/Send/SendPanel/SendRecipientList/SendRecipientListItem'

const setup = props =>
  mount(
    <Send
      {...props}
      sendableAssets={{ NEO: { balance: 5, symbol: 'NEO' } }}
      prices={{ NEO: 38 }}
      contacts={{ NeoFriend: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr' }}
      currencyCode="usd"
      shouldRenderHeaderBar={false}
    />
  )

const createAsset = (name, id) => ({
  asset: name,
  address: '',
  note: '',
  amount: 0,
  max: 10,
  id,
  errors: {}
})

describe('Send', () => {
  test('It shows ZeroAssets component when no sendable assets is present', () => {
    const wrapper = setup()

    expect(wrapper.find(ZeroAssets)).toBeTruthy()
  })

  test('It adds a row when you click Add Recipient button', () => {
    const wrapper = setup()

    wrapper.find('.sendPanelHeaderButton').simulate('click')
    expect(wrapper.instance().state.sendRowDetails.length).toBe(2)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(2)
  })

  test('It deletes the correct row when you click the delete icon for that row', () => {
    const wrapper = setup()

    const sendRowDetails = []
    sendRowDetails.push(
      createAsset('NEO', 1),
      createAsset('GAS', 2),
      createAsset('RPX', 3)
    )

    wrapper.setState({ sendRowDetails })
    wrapper
      .find('.deleteButton')
      .first()
      .simulate('click')

    const wrapperRows = wrapper.instance().state.sendRowDetails

    expect(wrapperRows.length).toBe(2)
    expect(wrapperRows[0].asset).toBe('GAS')
    expect(wrapperRows[1].asset).toBe('RPX')
  })

  test('It adds a maximum of 5 rows', () => {
    const wrapper = setup()

    for (let i = 0; i <= 6; i++) {
      wrapper.find('.sendPanelHeaderButton').simulate('click')
    }

    expect(wrapper.instance().state.sendRowDetails.length).toBe(5)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(5)
  })

  test('There is no trash icon when only one row is present', () => {
    const wrapper = setup()
    expect(wrapper.find('.deleteButton')).toHaveLength(0)
  })

  test('It validates and sets error in state when you submit empty inputs', () => {
    const wrapper = setup()

    wrapper.find('form').simulate('submit')
    const errors = wrapper.instance().state.sendRowDetails[0].errors

    expect(errors.amount).toBe('Can not send 0 NEO.')
    expect(errors.address).toBe('You need to specify a valid NEO address.')
  })

  test('It does not allow negative amounts', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = -5
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    const errors = wrapper.instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe('You cannot send negative amounts of NEO.')
  })

  test('It does not allow fractional amounts of NEO', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 1.5
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    const errors = wrapper.instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe('You cannot send fractional amounts of NEO.')
  })

  test('It fails when trying to send more than you have', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 100
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    const errors = wrapper.instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe(
      'You do not have enough balance to send 100 NEO.'
    )
  })

  test('It does allow fractional amounts of other assets', () => {
    const wrapper = setup()

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    const errors = wrapper.instance().state.sendRowDetails[0].errors
    expect(errors.amount).toBe(undefined)
  })

  test('It does not allow blacklisted addresses', () => {
    const wrapper = setup()

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    asset.address = 'ARU4Sw9yyqgfjxfqF1TNwWHHFvLbAVdTj1'
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    setTimeout(() => {
      const errors = wrapper.instance().state.sendRowDetails[0].errors

      expect(errors.address).toBe(
        'Address is blacklisted. This is a known phishing address.'
      )
    }, 0)
  })

  test('It does allow you to send to your own address', () => {
    const wrapper = setup({ address: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr' })

    const asset = createAsset('GAS', 1)
    asset.amount = 1.523
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    const errors = wrapper.instance().state.sendRowDetails[0].errors

    expect(errors.address).toBe(undefined)
  })

  test('It correctly sets max value', () => {
    const wrapper = setup()

    wrapper
      .find('.maxButton')
      .at(1)
      .simulate('click')
    expect(wrapper.instance().state.sendRowDetails[0].amount).toBe(5)

    wrapper.find('.sendPanelHeaderButton').simulate('click')
    wrapper
      .find('.maxButton')
      .at(3)
      .simulate('click')
    expect(wrapper.instance().state.sendRowDetails[1].amount).toBe(0)
  })

  test('It proceeds to the next step with valid input', () => {
    const wrapper = setup()

    const asset = createAsset('NEO', 1)
    asset.amount = 1
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.setState({ sendRowDetails: [asset] })
    wrapper.find('form').simulate('submit')

    setTimeout(
      () => expect(wrapper.instance().state.showConfirmSend).toBe(true),
      0
    )
  })

  test('It calls sendTransaction when you click confirm and send', () => {
    const wrapper = setup({ sendTransaction: jest.fn(() => Promise.resolve()) })

    const asset = createAsset('NEO', 1)
    asset.amount = 1
    asset.address = 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr'
    wrapper.setState({ sendRowDetails: [asset] })

    wrapper.find('form').simulate('submit')
    wrapper.find('form').simulate('submit')

    const sendTransaction = wrapper.instance().props.sendTransaction

    setTimeout(() => {
      expect(sendTransaction).toHaveBeenCalledTimes(1)
      expect(sendTransaction).toHaveBeenCalledWith([
        {
          address: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr',
          amount: 1,
          note: '',
          symbol: 'NEO'
        }
      ])
    }, 0)
  })
})
