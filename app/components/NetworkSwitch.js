import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import { getBalance, getTransactionHistory, getMarketPriceUSD, neoId, getClaimAmounts, getWalletDBHeight } from '../wallet/api.js';
import { setBalance, setMarketPrice, resetPrice, setTransactionHistory, setClaim, setBlockHeight } from '../actions/index.js';

let intervals = {};

let netSelect;

// TODO: this is being imported by Balance.js, maybe refactor to helper file

const initiateGetBalance = (dispatch, net, address) => {
  syncTransactionHistory(dispatch, net, address);
  syncAvailableClaim(dispatch, net, address);
  syncBlockHeight(dispatch, net);
  return getBalance(net, address).then((resultBalance) => {
    return getMarketPriceUSD(resultBalance.Neo).then((resultPrice) => {
      dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, resultPrice));
      return true;
    });
  }).catch((result) => {
    // TODO: is this ever called?
  });
};

const syncAvailableClaim = (dispatch, net, address) => {
  getClaimAmounts(net, address).then((result) => {
    //claimAmount / 100000000
    dispatch(setClaim(result.available, result.unavailable));
  });
}

const syncBlockHeight = (dispatch, net) => {
  getWalletDBHeight(net).then((blockHeight) => {
    dispatch(setBlockHeight(blockHeight));
  });
};

const syncTransactionHistory = (dispatch, net, address) => {
  getTransactionHistory(net, address).then((transactions) => {
    let txs = [];
    for (let i = 0; i < transactions.length; i++){
      if (transactions[i].neo_sent === true){
        txs = txs.concat([{type: "NEO", amount: transactions[i].NEO, txid: transactions[i].txid, block_index: transactions[i].block_index }]);
      }
      if (transactions[i].gas_sent === true){
        txs = txs.concat([{type: "GAS", amount: transactions[i].GAS, txid: transactions[i].txid, block_index: transactions[i].block_index }]);
      }
    }
    dispatch(setTransactionHistory(txs));
  });
};

const resetBalanceSync = (dispatch, net, address) => {
  console.log("sync", net);
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
  net: state.metadata.network,
  address: state.account.address
});

NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

export { NetworkSwitch, initiateGetBalance, syncTransactionHistory, intervals };
