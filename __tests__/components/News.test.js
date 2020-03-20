import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'

import IntlWrapper from '../../app/components/Root/IntlWrapper'
import News from '../../app/containers/News'

const setup = (
  shallowRender = true,
  state = {
    account: {
      loggedIn: true,
      wif: undefined,
    },
  },
) => {
  const store = configureStore()(state)
  const Component = News

  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper>
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <Component store={store} />
        </MemoryRouter>
      </IntlWrapper>
    </Provider>,
  )

  return {
    store,
    wrapper,
  }
}

describe('News', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
