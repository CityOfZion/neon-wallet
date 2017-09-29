import React from 'react';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import Claim from '../../app/components/Claim';
import * as neonjs from 'neon-js';
import { setClaimRequest, disableClaim } from '../../app/modules/claim';
import { sendEvent } from '../../app/modules/transactions';

const state = { 
  claim: {
    claimAmount: 10,
    claimRequest: false,
    claimWasUpdated: false,
    disableClaimButton: false,
  },
  account: {
    wif: 'wif',
    address: 'address'
  },
  metadata: {
    network: 'network',
  },
  wallet: {
    Neo: 'neo',
  }
}

describe('Claim', () => {
  test('should render without crashing', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<Claim store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should render claim gas button when claim button is not disabled', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<Claim store={store} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
  
  test('should not render claim gas button when claim button is disabled', () => {
    const newState = _.cloneDeep(state);
    newState.claim.disableClaimButton = true;
    const store = configureStore()(newState);
    const wrapper = shallow(<Claim store={store} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
  
  describe('when do gas claim button is clicked', () => {
    const store = configureStore()(state);
    const wrapper = shallow(<Claim store={store} />);
    
    test('should dispatch transaction failure event', (done) => {
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: undefined });
        });
      });
      wrapper.dive().find('#claim button').simulate('click');
      
      setTimeout(() => {
        try {
          expect(store.getActions()[0]).toEqual(sendEvent(true, 'Sending Neo to Yourself...')); 
          expect(store.getActions()[1]).toEqual(sendEvent(false, 'Transaction failed!')); 
        } catch (error) {
          throw 'TimeoutException';
        } finally {
          done();
        }
      }, 0);
    });
    
    test('should dispatch transaction waiting, set claim request and disable claim event', (done) => {
      neonjs.doSendAsset = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: '' });
        });
      });
      wrapper.dive().find('#claim button').simulate('click');

      setTimeout(() => {
        try {
          expect(store.getActions()[0]).toEqual(sendEvent(true, 'Sending Neo to Yourself...')); 
          expect(store.getActions()[1]).toEqual(sendEvent(true, "Waiting for transaction to clear...")); 
          expect(store.getActions()[2]).toEqual(setClaimRequest(true)); 
          expect(store.getActions()[3]).toEqual(disableClaim(true)); 
        } catch (error) {
          throw 'TimeoutException';
        } finally {
          done();
        }
      }, 0);
    });
  });
  
  describe('when claim is requested and updated', () => {
    const newState = _.cloneDeep(state);
    newState.claim.claimRequest = true;
    newState.claim.claimWasUpdated = true;
    newState.dispatch = jest.fn();
    
    test('should dispatch false claim request and claim successful event', (done) => {
      const store = configureStore()(newState);
      const wrapper = mount(<Claim store={store} />);
      neonjs.doClaimAllGas = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: true });
        });
      });
      wrapper.setProps({ target: '' });
      
      setTimeout(() => {
        try {
          expect(store.getActions()[0]).toEqual(setClaimRequest(false)); 
          expect(store.getActions()[1]).toEqual(sendEvent(true, 'Claim was successful! Your balance will update once the blockchain has processed it.')); 
        } catch (error) {
          throw 'TimeoutException';
        } finally {
          done();
        }
      }, 0);
    });
    
    test('should dispatch false claim request and claim failure event', (done) => {
      const store = configureStore()(newState);
      const wrapper = mount(<Claim store={store} />);
      neonjs.doClaimAllGas = jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve({ result: false });
        });
      });
      wrapper.setProps({ target: '' });
      
      setTimeout(() => {
        try {
          expect(store.getActions()[0]).toEqual(setClaimRequest(false)); 
          expect(store.getActions()[1]).toEqual(sendEvent(false, 'Claim failed')); 
        } catch (error) {
          throw 'TimeoutException';
        } finally {
          done();
        }
      }, 0);
    });
  });
});