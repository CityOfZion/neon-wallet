import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'

import Login from '../../app/containers/LoginPrivateKey/LoginPrivateKey'

const setup = (shallowRender = true, state = { account: {
  loggedIn: true,
  wif: undefined
}}) => {
  const store = configureStore()(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<Login store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login store={store} />
        </BrowserRouter>
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('Login', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('clicking show key icon toggles private key visibility', () => {
    const { wrapper } = setup(false)

    expect(wrapper.find('input').get(0).props.type).toEqual('password')

    wrapper
      .find('.viewKey')
      .first()
      .simulate('click')

    expect(wrapper.find('input').get(0).props.type).toEqual('text')
  })

  // test('private key field input onChange dispatches LOGIN action', () => {
  //   const { store, wrapper } = setup();
  //   let preventDefault = jest.fn();
  //   const deeperWrapper = wrapper.shallow();
  //
  //   const someWif = 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'
  //   deeperWrapper
  //     .find('input')
  //     .simulate('change', { target: { value: someWif } })
  //     .find('button')
  //     .simulate('click');
  //
  //   expect(store.getActions()).toEqual([
  //     { wif: someWif, type: 'LOGIN' }
  //   ]);
  // });
})
