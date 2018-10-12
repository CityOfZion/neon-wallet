import React from 'react'
import { mount } from 'enzyme'
import Select from 'react-select'

import NetworkSwitch from '../../app/containers/App/Sidebar/NetworkSwitch/NetworkSwitch'
import SelectInput from '../../app/components/Inputs/SelectInput'
import DropdownButton from '../../app/components/Inputs/SelectInput/DropdownButton'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from '../../app/core/constants'

const NETWORKS = [
  {
    id: MAIN_NETWORK_ID,
    value: MAIN_NETWORK_ID,
    label: 'MainNet',
    network: 'MainNet'
  },
  {
    id: TEST_NETWORK_ID,
    value: TEST_NETWORK_ID,
    label: 'TestNet',
    network: 'TestNet'
  }
]

const setup = () => {
  const props = {
    value: NETWORKS[0],
    networks: NETWORKS,
    onChange: jest.fn()
  }
  const wrapper = mount(<NetworkSwitch {...props} />)

  return {
    wrapper
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('correctly renders MainNet initially', () => {
    const { wrapper } = setup()
    const networkInput = wrapper.find(Select).instance()
    expect(networkInput.props.value.label).toEqual('MainNet')
  })

  // TODO: fix me!
  // test('switches to the correct network when chosen from the dropdown', () => {
  //   const { wrapper } = setup()
  //   const networkInput = wrapper.find(Select).instance()
  //   wrapper.find(Select).simulate('click')
  //   wrapper.find(Select).simulate('keyDown', { keyCode: 40 })
  //   wrapper.find(Select).simulate('keyDown', { keyCode: 13 })

  //   expect(networkInput.props.value.label).toEqual('TestNet')
  // })
})
