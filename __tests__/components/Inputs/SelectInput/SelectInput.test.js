import React from 'react'
import { shallow, mount } from 'enzyme'
import SelectInput from '../../../../app/components/Inputs/SelectInput/SelectInput'

describe('SelectInput', () => {
  const props = {
    className: 'customClassName',
    value: 'some text',
    items: [{
      label: 'Foo',
      value: 'foo'
    }, {
      label: 'Bar',
      value: 'bar'
    }, {
      label: 'Has some text',
      value: 'has-some-text'
    }],
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

  test('should filter the search results based upon the input value', () => {
    const wrapper = mount(<SelectInput {...props} value='foo' />)
    wrapper.find('.input').simulate('focus')
    expect(wrapper.find('.dropdownItem')).toHaveLength(1)
    expect(wrapper.find('.dropdownItem').text()).toContain('Foo')
  })
})
