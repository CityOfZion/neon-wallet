import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { waitForElement } from '../testHelpers'


import Login from '../../app/containers/LoginPrivateKey/LoginPrivateKey'
import LoginWithHOC from '../../app/containers/LoginPrivateKey/'

const setup = (
  shallowRender = true,
  withHOC = false,
  state = {
    account: {
      loggedIn: true,
      wif: undefined
    }
  }
) => {
  const store = configureStore()(state)
  const Component = withHOC ? LoginWithHOC : Login

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<Component store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Component store={store} />
        </MemoryRouter>
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
      .find('.icon')
      .first()
      .simulate('click')

    expect(wrapper.find('input').get(0).props.type).toEqual('text')
  })

  test('qr scan button should be active according to camera availability', async () => {
    // mount Login with HOC
    const { wrapper } = setup(false, true)

    // mock 1 available camera
    global.navigator.mediaDevices = {
      enumerateDevices: jest.fn().mockResolvedValue([{ kind: 'videoinput' }])
    }

    // wait until the enabled button is found in dom
    const enabledButton = await waitForElement(
      wrapper,
      '#scan-private-key-qr-button[disabled=false]'
    )

    // assert that the enabled button exists
    expect(enabledButton).toBeDefined()

    // mock 0 available cameras
    global.navigator.mediaDevices = {
      enumerateDevices: jest.fn().mockResolvedValue([])
    }

    // wait until the disabled button is found in dom
    const disabledButton = await waitForElement(
      wrapper,
      '#scan-private-key-qr-button[disabled=true]'
    )

    // assert that the disabled button exists
    expect(disabledButton).toBeDefined()
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
