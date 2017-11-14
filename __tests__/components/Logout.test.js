import React from 'react'
import { shallow } from 'enzyme'
import Logout from '../../app/components/Logout'

describe('Logout', () => {
  const logout = jest.fn()
  test('should render without crashing', () => {
    const wrapper = shallow(<Logout logout={logout} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should dispatch logout action when clicked', () => {
    const wrapper = shallow(<Logout logout={logout} />)
    expect(logout.mock.calls.length).toEqual(0)
    wrapper.find('.logout').simulate('click')
    expect(logout.mock.calls.length).toEqual(1)
  })
})
