import React from 'react'
import { shallow } from 'enzyme'
import AddressInput from '../../../../app/components/Inputs/AddressInput/AddressInput'

describe('AddressInput', () => {
  const props = {
    contacts: {
      'Lenny': 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4',
      'Carl': 'AUB7tuEZK63a9fkPEgeeddiZBg7A6PgbZB'
    }
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<AddressInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
