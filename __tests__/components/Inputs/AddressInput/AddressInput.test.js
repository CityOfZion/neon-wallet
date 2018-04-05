import React from 'react'
import { shallow, mount } from 'enzyme'
import AddressInput from '../../../../app/components/Inputs/AddressInput/AddressInput'

describe('AddressInput', () => {
  const props = {
    addresses: {
      'Lenny': 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4',
      'Carl': 'AUB7tuEZK63a9fkPEgeeddiZBg7A6PgbZB'
    },
    loadAddresses: jest.fn()
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<AddressInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should load addresses on mount', () => {
    mount(<AddressInput {...props} />)
    expect(props.loadAddresses).toHaveBeenCalled()
  })
})
