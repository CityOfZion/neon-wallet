import React from 'react'
import { mount } from 'enzyme'
import Select from 'react-select'
import { IntlProvider } from 'react-intl'

import NetworkSwitch from '../../app/containers/App/Sidebar/NetworkSwitch/NetworkSwitch'
import SelectInput from '../../app/components/Inputs/SelectInput'
import DropdownButton from '../../app/components/Inputs/SelectInput/DropdownButton'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  MAIN_NETWORK_LABEL,
} from '../../app/core/constants'
import { getNetworks } from '../../app/core/networks'

const NETWORKS = getNetworks()

const setup = () => {
  const props = {
    value: NETWORKS[0],
    networks: NETWORKS,
    onChange: jest.fn(),
  }
  const wrapper = mount(
    <IntlProvider locale="en">
      <NetworkSwitch {...props} />
    </IntlProvider>,
  )

  return {
    wrapper,
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
    expect(networkInput.props.value.label).toEqual(MAIN_NETWORK_LABEL)
  })
})
