import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount, shallow } from 'enzyme'
import PriceDisplay from '../../app/containers/PriceDisplay'
import { formatFiat } from '../../app/core/formatters'

const initialState = {
  wallet: {
    neoPrice: 25.48,
    gasPrice: 18.10
  }
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<PriceDisplay store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <PriceDisplay />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('PriceDisplay', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })
  test('correctly renders data from state', (done) => {
    const { wrapper } = setup(initialState, false)

    const neoPrice = wrapper.find('#neoPrice .price')
    const gasPrice = wrapper.find('#gasPrice .price')
    const expectedNeoPrice = formatFiat(initialState.wallet.neoPrice)
    const expectedGasPrice = formatFiat(initialState.wallet.gasPrice)

    expect(neoPrice.text()).toEqual(`$${expectedNeoPrice}`)
    expect(gasPrice.text()).toEqual(`$${expectedGasPrice}`)
    done()
  })
})
