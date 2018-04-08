import React from 'react'
import { shallow } from 'enzyme'

import NetworkSwitch from '../../app/containers/App/Header/NetworkSwitch/NetworkSwitch'
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
  const wrapper = shallow(<NetworkSwitch {...props} />)

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
    const networkSelectorElement = wrapper.find('.networkSelector').getElement()

    expect(networkSelectorElement.props.defaultValue).toEqual(MAIN_NETWORK_ID)
  })

  test('switches to the correct network when chosen from the dropdown', () => {
    const { wrapper } = setup()
    const instance = wrapper.instance()
    const networkSelector = wrapper.find('.networkSelector')

    networkSelector.simulate('change', { target: { value: TEST_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(TEST_NETWORK_ID)

    networkSelector.simulate('change', { target: { value: MAIN_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(MAIN_NETWORK_ID)
  })
})
