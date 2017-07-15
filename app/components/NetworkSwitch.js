import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import { getBalance } from '../wallet/api.js';
import { setBalance } from '../actions/index.js';

let netSelect;

// TODO: this is being imported by Balance.js, maybe refactor to helper file
const initiateGetBalance = (dispatch, net, address) => {
  getBalance(net, address).then(function(result){
    // if account/key has never been used, may not be a valid API call
    // TODO: return/pass something better than undefined
    if(result === undefined){
      dispatch(setBalance(undefined, undefined));
    } else{
      dispatch(setBalance(result.ANS, result.ANC));
    }
  });
};

const switchNet = (dispatch, address) => {
  dispatch(setNetwork(netSelect.value));
  if (address !== null){
    initiateGetBalance(dispatch, netSelect.value, address);
  }
};

let NetworkSwitch = ({dispatch, net, address}) =>
  <div id="networkSwitch">
    <select ref={node => {netSelect = node;}} onChange={() => switchNet(dispatch, address)}>
      {(net === "MainNet") ? <option selected>MainNet</option> : <option>MainNet</option>}
      {(net === "TestNet") ? <option selected>TestNet</option> : <option>TestNet</option>}
    </select>
  </div>

  const mapStateToProps = (state) => ({
    net:state.wallet.net,
    address:state.account.address
  });

  NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

  export { NetworkSwitch, initiateGetBalance };
