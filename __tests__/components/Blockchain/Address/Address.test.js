import React from 'react'
import { shallow } from 'enzyme'

import Address from '../../../../app/components/Blockchain/Address/Address'
import { TEST_NETWORK_ID, EXPLORERS } from '../../../../app/core/constants'

describe('Address', () => {
  const props = {
    address: 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4',
    networkId: TEST_NETWORK_ID,
    explorer: EXPLORERS.NEO_SCAN
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<Address {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
