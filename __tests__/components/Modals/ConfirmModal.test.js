import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import ConfirmModal from '../../../app/components/Modals/ConfirmModal/ConfirmModal'
import { createStore } from '../../testHelpers'
import configureStore from 'redux-mock-store'

const store = configureStore()({})

describe('ConfirmModal', () => {
  const props = {
    title: 'test modal',
    text: 'text',
    hideModal: jest.fn(),
    onClick: jest.fn(),
    onCancel: jest.fn(),
    backButtonAction: jest.fn(),
    store: store
  }

  test('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmModal {...props} />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find(ConfirmModal)).toMatchSnapshot()
  })

  test('should render the text correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmModal {...props} />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('.text').text()).toEqual(props.text)
  })

  test('should trigger the onCancel function followed by hideModal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmModal {...props} />
        </MemoryRouter>
      </Provider>
    )

    wrapper
      .find('#cancel')
      .hostNodes()
      .simulate('click')

    expect(props.onCancel).toHaveBeenCalled()
    expect(props.hideModal).toHaveBeenCalled()
  })

  test('should trigger the onClick function followed by hideModal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmModal {...props} />
        </MemoryRouter>
      </Provider>
    )

    wrapper
      .find('#confirm')
      .hostNodes()
      .simulate('click')

    expect(props.onClick).toHaveBeenCalled()
    expect(props.hideModal).toHaveBeenCalled()
  })
})
