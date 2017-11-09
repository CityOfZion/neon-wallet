import React from 'react'
import { shallow } from 'enzyme'
import ConfirmModal from '../../../app/components/Modals/ConfirmModal/ConfirmModal'

describe('ConfirmModal', () => {
  const props = {
    title: 'test modal',
    text: 'text',
    hideModal: jest.fn(),
    onClick: jest.fn(),
    onCancel: jest.fn()
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<ConfirmModal {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  test('should render the title correctly', () => {
    const wrapper = shallow(<ConfirmModal {...props} />)

    expect(wrapper.dive().find('.modalHeaderTitle').text()).toEqual(props.title)
  })

  test('should render the text correctly', () => {
    const wrapper = shallow(<ConfirmModal {...props} />)

    expect(wrapper.dive().find('.text').text()).toEqual(props.text)
  })

  test('should trigger the onCancel function followed by hideModal', () => {
    const wrapper = shallow(<ConfirmModal {...props} />)

    wrapper.dive().find('.cancelButton').simulate('click')

    expect(props.onCancel).toHaveBeenCalled()
    expect(props.hideModal).toHaveBeenCalled()
  })

  test('should trigger the onClick function followed by hideModal', () => {
    const wrapper = shallow(<ConfirmModal {...props} />)

    wrapper.dive().find('.actionButton').simulate('click')

    expect(props.onClick).toHaveBeenCalled()
    expect(props.hideModal).toHaveBeenCalled()
  })
})
