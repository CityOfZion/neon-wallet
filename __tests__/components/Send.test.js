import React from 'react'

import { mount } from 'enzyme'

import Send from '../../app/containers/Send/Send'
import ZeroAssets from '../../app/components/Send/SendPanel/ZeroAssets'
import SendRecipientListItem from '../../app/components/Send/SendPanel/SendRecipientList/SendRecipientListItem'

const setup = props =>
  mount(
    <Send
      {...props}
      prices={{ NEO: 38 }}
      contacts={{ NeoFriend: 'AMKxqiSSLR89wLVEk5CoGRjKHRrmrR8bDr' }}
    />
  )
// const dummyAsset = {
//   asset: 'NEO',
//   address: '',
//   note: '',
//   amount: 0,
//   max: 10,
//   id: 4,
//   errors: {}
// }

describe('Send', () => {
  test('It shows ZeroAssets component when no sendable assets is present', () => {
    const wrapper = setup({ sendableAssets: {} })

    expect(wrapper.find(ZeroAssets)).toBeTruthy()
  })

  test('It adds a row when you click Add Recipient button', () => {
    const wrapper = setup({
      sendableAssets: { NEO: { balance: 5, symbol: 'NEO' } }
    })

    wrapper.find('.sendPanelHeaderButton').simulate('click')
    expect(wrapper.instance().state.sendRowDetails.length).toBe(2)
    expect(wrapper.find(SendRecipientListItem).children().length).toBe(2)
  })
})
