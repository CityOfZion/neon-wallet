import React from 'react'
import { shallow, mount } from 'enzyme'

import NetworkSwitch from '../../app/components/Settings/NetworkSwitch/NetworkSwitch'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from '../../app/core/constants'

const MAIN_NET_LABEL = 'MainNet'

const setup = (shallowRender = true) => {
  const props = {
    networkId: MAIN_NETWORK_ID,
    networks: [
      {
        id: MAIN_NETWORK_ID,
        label: MAIN_NET_LABEL,
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

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<NetworkSwitch {...props} />)
  } else {
    wrapper = mount(<NetworkSwitch {...props} />)
  }

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
    const networkSelectorElement = wrapper.find('.networkSelector').getElement();
    expect(networkSelectorElement.props.value).toEqual(MAIN_NET_LABEL)
  })

  test('switches to the correct network when chosen from the dropdown', () => {
    const { wrapper } = setup(false)
    const instance = wrapper.instance()

    const networkSelector = wrapper.find('.networkSelector input')

    networkSelector.simulate('change', { target: { value: TEST_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(TEST_NETWORK_ID)

    networkSelector.simulate('change', { target: { value: MAIN_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(MAIN_NETWORK_ID)
  })
})
