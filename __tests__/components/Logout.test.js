import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Logout from '../../app/components/Logout';
import { logout } from '../../app/modules/account';

const state = {}

describe('Logout', () => {
  test('should render without crashing', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<Logout store={store} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
  
  test('should dispatch logout action when clicked', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<Logout store={store} />);
    wrapper.dive().find('#logout').simulate('click');
    expect(store.getActions()[0]).toEqual(logout());
  });
});