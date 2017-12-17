import React from 'react'
import { shallow, mount } from 'enzyme'
import AddressInput from '../../../../app/components/Inputs/AddressInput/AddressInput'

describe('AddressInput', () => {
  const props = {
    addresses: {
      'Lenny': 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4',
      'Carl': 'AUB7tuEZK63a9fkPEgeeddiZBg7A6PgbZB'
    },
    loadAddresses: jest.fn(),
    saveAddress: jest.fn(),
    deleteAddress: jest.fn()
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<AddressInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should load addresses on mount', () => {
    mount(<AddressInput {...props} />)
    expect(props.loadAddresses).toHaveBeenCalled()
  })

  describe('save icon', () => {
    test('should not render by default', () => {
      const wrapper = shallow(<AddressInput {...props} />)
      expect(wrapper.dive().find('#saveIcon').exists()).toEqual(false)
    })

    test('should not render when the value is already saved to the address book', () => {
      const wrapper = shallow(<AddressInput {...props} value='AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4' />)
      expect(wrapper.dive().find('#saveIcon').exists()).toEqual(false)
    })

    test('should render when the value is a valid address', () => {
      const wrapper = shallow(<AddressInput {...props} value='AQzrKoxniN1P4VeP8qyAL4xfX8vJPQ9M8h' />)
      expect(wrapper.dive().find('#saveIcon').exists()).toEqual(true)
    })
  })
})
