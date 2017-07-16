import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import { getBalance, getTransactions, ansId } from '../wallet/api.js';
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

const syncTransactionHistory = (dispatch, net, address) => {
  getTransactions(net, address, ansId).then((response) => {
    // TODO: no public API yet exists for ALL transation history
    // so this does nothing for now
  });
};

const toggleNet = (dispatch, net, address) => {
  let newNet;
  if (net === "MainNet"){
    newNet = "TestNet";
  } else {
    newNet = "MainNet";
  }
  dispatch(setNetwork(newNet));
  if (address !== null){
    initiateGetBalance(dispatch, newNet, address);
    syncTransactionHistory(dispatch, newNet, address);
  }
};

let NetworkSwitch = ({dispatch, net, address}) =>
  <div id="network">
    <span className="transparent">Running on</span>
    <span className="netName" onClick={() => toggleNet(dispatch, net, address)}>{net}</span>
  </div>

  const mapStateToProps = (state) => ({
    net:state.wallet.net,
    address:state.account.address
  });

  NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

  export { NetworkSwitch, initiateGetBalance, syncTransactionHistory };
