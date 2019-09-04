import React from 'react'
import { shallow, mount } from 'enzyme'
import { createStore, provideStore, provideState } from '../testHelpers'

import Sidebar from '../../app/containers/App/Sidebar/Sidebar'

const initialState = {}
const store = createStore(initialState)
const wrapper = shallow(<Sidebar count={200} />)

describe('Sidebar', () => {
  test('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('renders block height when count prop present', () => {
    console.log({ wrapper: wrapper.debug() })
    const height = wrapper.find('#block-height')
    expect(height.text()).toEqual('200')
  })
})
