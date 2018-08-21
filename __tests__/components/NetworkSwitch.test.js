import React from 'react'
import { mount } from 'enzyme'

import NetworkSwitch from '../../app/containers/App/Sidebar/NetworkSwitch/NetworkSwitch'
import TextInput from '../../app/components/Inputs/TextInput'
import SelectInput from '../../app/components/Inputs/SelectInput'
import DropdownButton from '../../app/components/Inputs/SelectInput/DropdownButton'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from '../../app/core/constants'

const setup = () => {
  const props = {
    networkId: MAIN_NETWORK_ID,
    networks: [
      {
        id: MAIN_NETWORK_ID,
        label: 'MainNet',
        network: 'MainNet'
      },
      {
        id: TEST_NETWORK_ID,
        label: 'TestNet',
        network: 'TestNet'
      }
    ],
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
    const networkInput = wrapper.find(TextInput).instance()

    expect(networkInput.props.value).toEqual('MainNet')
  })

  test('switches to the correct network when chosen from the dropdown', () => {
    const { wrapper } = setup()
    const networkSelector = wrapper.find(SelectInput).instance()

    networkSelector.setState({ open: true })

    wrapper.update()
    const dropDownButton = wrapper.find('.dropdownItem')
    dropDownButton.simulate('click')

    expect(wrapper.instance().props.onChange).toHaveBeenCalledWith(
      TEST_NETWORK_ID
    )
  })
})
