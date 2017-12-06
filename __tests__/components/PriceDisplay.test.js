import React from 'react'
import { mount } from 'enzyme'

import PriceDisplay from '../../app/containers/App/Header/PriceDisplay'

import { DEFAULT_CURRENCY_CODE } from '../../app/core/constants'

describe('PriceDisplay', () => {
  test('renders and shows prices', (done) => {
    // Full mount (not shallow) so the snapshot will contain the prices in the rendered html.
    const wrapper = mount(<PriceDisplay neoPrice={25.48} gasPrice={18.10} currencyCode={DEFAULT_CURRENCY_CODE} />)
    expect(wrapper).toMatchSnapshot()
    done()
  })
})
