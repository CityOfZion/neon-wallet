import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import QRCode from 'qrcode';
import CreateWallet from '../../app/components/CreateWallet';
import * as Clipboard from '../../app/components/Clipboard';
import { newWallet } from '../../app/modules/generateWallet';

const state = {
  generateWallet: {
    wif: 'wif',
    address: 'address'
  }
}

describe('CreateWallet', () => {
  test('should render without crashing', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<CreateWallet store={store} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
  
  test('should dispatch new wallet action', () => {
    const store = configureStore()(state);
    const wrapper = mount(<CreateWallet store={store} />);
    expect(store.getActions()[0]).toEqual(newWallet());
  });
  
  test('should dispatch new wallet action', () => {
    const store = configureStore()(state);
    const wrapper = mount(<CreateWallet store={store} />);
    const toCanvas = QRCode.toCanvas = jest.fn();
    wrapper.setProps({ target: '' });
    expect(toCanvas.mock.calls.length).toEqual(2);
    expect(toCanvas).toHaveBeenCalledWith(expect.any(Object), 'address', {version: 5}, expect.any(Function));
    expect(toCanvas).toHaveBeenCalledWith(expect.any(Object), 'wif', {version: 5}, expect.any(Function));
  });

  test('should copy address to clipboard when clicked', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<CreateWallet store={store} />);
    Clipboard.writeText = jest.fn();
    wrapper.dive().find('.copyKey').at(0).simulate('click');
    expect(Clipboard.writeText).toHaveBeenCalledWith('address');
  });

  test('should copy wif to clipboard when clicked', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<CreateWallet store={store} />);
    Clipboard.writeText = jest.fn();
    wrapper.dive().find('.copyKey').at(1).simulate('click');
    expect(Clipboard.writeText).toHaveBeenCalledWith('wif');
  });
});