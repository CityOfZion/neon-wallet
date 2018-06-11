import React from 'react'
import { shallow } from 'enzyme'

import Transaction from '../../../../app/components/Blockchain/Transaction/Transaction'
import { TEST_NETWORK_ID, EXPLORERS } from '../../../../app/core/constants'

describe('Transaction', () => {
  const props = {
    explorer: EXPLORERS.NEO_SCAN,
    networkId: TEST_NETWORK_ID,
    txid: 'b1b4be0852c402d6d2609c2026b700702333e32a4bbf4f9e13ebe07699323951'
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<Transaction { ...props } />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should handle the click event', () => {
    const spy = jest.spyOn(Transaction.prototype, 'handleClick')
    const wrapper = shallow(<Transaction { ...props } />)
    wrapper.simulate('click')
    expect(spy).toHaveBeenCalled();
  });
});
