import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import PriceDisplay from '../../app/containers/PriceDisplay'

const initialState = {
  wallet: {
    neoPrice: 25.48,
    gasPrice: 18.10
  }
}

const setup = (state = initialState) => {
  const store = configureStore([thunk])(state)
  const wrapper = shallow(<PriceDisplay store={store} />)

  return {
    store,
    wrapper
  }
}

describe('PriceDisplay', () => {
  test('PriceDisplay renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })
})
