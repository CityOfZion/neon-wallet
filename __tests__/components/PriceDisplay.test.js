import React from 'react'
import { mount } from 'enzyme'
import PriceDisplay from '../../app/components/PriceDisplay'

describe('PriceDisplay', () => {
  test('renders and shows prices', (done) => {
    // Full mount (not shallow) so the snapshot will contain the prices in the rendered html.
    const wrapper = mount(<PriceDisplay neoPrice={25.48} gasPrice={18.10} />)
    expect(wrapper).toMatchSnapshot()
    done()
  })
})
