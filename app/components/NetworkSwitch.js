import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import { getBalance, getTransactionHistory, getMarketPriceUSD, ansId } from '../wallet/api.js';
import { setBalance, setMarketPrice, resetPrice, setTransactionHistory } from '../actions/index.js';

let intervals = {};

let netSelect;

// TODO: this is being imported by Balance.js, maybe refactor to helper file

const initiateGetBalance = (dispatch, net, address) => {
  syncTransactionHistory(dispatch, net, address);
  return getBalance(net, address).then((resultBalance) => {
    return getMarketPriceUSD(resultBalance.ANS).then((resultPrice) => {
      dispatch(setBalance(resultBalance.ANS, resultBalance.ANC, resultPrice));
    });
  }).catch((result) => {
    console.log(result);
  });
};

const syncTransactionHistory = (dispatch, net, address) => {
  getTransactionHistory(net, address).then((transactions) => {
    let txs = [];
    for (let i = 0; i < transactions.length; i++){
      if (transactions[i].NEO !== 0){
        txs = txs.concat([{type: "NEO", amount: transactions[i].NEO, txid: transactions[i].txid, block_index: transactions[i].block_index }]);
      }
      if (transactions[i].GAS !== 0){
        txs = txs.concat([{type: "GAS", amount: transactions[i].GAS, txid: transactions[i].txid, block_index: transactions[i].block_index }]);
      }
    }
    dispatch(setTransactionHistory(txs));
  });
};

const resetBalanceSync = (dispatch, net, address) => {
  if (intervals.balance !== undefined){
    clearInterval(intervals.balance);
  }
  intervals.balance = setInterval(() =>  {
    initiateGetBalance(dispatch, net, address);
  }, 5000);
};

const toggleNet = (dispatch, net, address) => {
  let newNet;
  if (net === "MainNet"){
    newNet = "TestNet";
  } else {
    newNet = "MainNet";
  }
  dispatch(setNetwork(newNet));
  resetBalanceSync(dispatch, newNet, address);
  if (address !== null){
    initiateGetBalance(dispatch, newNet, address);
  }
};

class NetworkSwitch extends Component {
  componentDidMount = () => {
    resetBalanceSync(this.props.dispatch, this.props.net, this.props.address);
  }

  render = () =>
     <div id="network">
       <span className="transparent">Running on</span>
       <span className="netName" onClick={() => toggleNet(this.props.dispatch, this.props.net, this.props.address)}>{this.props.net}</span>
     </div>;
}

const mapStateToProps = (state) => ({
  net:state.wallet.net,
  address:state.account.address
});

NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

export { NetworkSwitch, initiateGetBalance, syncTransactionHistory, intervals };
