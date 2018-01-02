import React from 'react'
import { shallow, mount } from 'enzyme'
import SelectInput from '../../../../app/components/Inputs/SelectInput/SelectInput'

describe('SelectInput', () => {
  const props = {
    className: 'customClassName',
    value: 'some text',
    items: ['Foo', 'Bar', 'Has some text'],
    onFocus: jest.fn(),
    onChange: jest.fn()
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<SelectInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render the input correctly', () => {
    const wrapper = shallow(<SelectInput {...props} />)
    expect(wrapper.dive().find('.input').props().value).toEqual(props.value)
  })

  test('should not render the dropdown by default', () => {
    const wrapper = shallow(<SelectInput {...props} />)
    expect(wrapper.dive().find('.dropdown').exists()).toEqual(false)
  })

  test('should render the dropdown when the input has focus', () => {
    const wrapper = mount(<SelectInput {...props} />)
    wrapper.find('.input').simulate('focus')
    expect(wrapper.find('.dropdown').exists()).toEqual(true)
  })

  test('should not filter the search results on initial open', () => {
    const wrapper = mount(<SelectInput {...props} value='Foo' />)
    wrapper.find('.input').simulate('focus')
    expect(wrapper.find('.dropdownItem')).toHaveLength(props.items.length)
  })
})
