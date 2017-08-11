import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBalance, getTransactionHistory, getMarketPrices, neoId, getClaimAmounts, getWalletDBHeight } from 'neon-js';
import { setClaim } from '../modules/claim';
import { setBlockHeight, setNetwork } from '../modules/metadata';
import { setBalance, setMarketPrices, setTransactionHistory, } from '../modules/wallet';

let intervals = {};

let netSelect;

// TODO: this is being imported by Balance.js, maybe refactor to helper file

const initiateGetBalance = (dispatch, net, address, currencyCode) => {
  syncTransactionHistory(dispatch, net, address);
  syncAvailableClaim(dispatch, net, address);
  syncBlockHeight(dispatch, net);
  return getBalance(net, address).then((resultBalance) => {
    const amounts = { neo: resultBalance.Neo, gas: resultBalance.Gas };
    return getMarketPrices(amounts, currencyCode).then((resultPrices) => {
      dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, { Neo: resultPrices.Neo, Gas: resultPrices.Gas }));
    });
  }).catch((result) => {
    // If API dies, still display balance
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

const resetBalanceSync = (dispatch, net, address, currencyCode) => {
  if (intervals.balance !== undefined){
    clearInterval(intervals.balance);
  }
  intervals.balance = setInterval(() =>  {
    initiateGetBalance(dispatch, net, address, currencyCode);
  }, 5000);
};

const toggleNet = (dispatch, net, address, currencyCode) => {
  let newNet;
  if (net === "MainNet"){
    newNet = "TestNet";
  } else {
    newNet = "MainNet";
  }
  dispatch(setNetwork(newNet));
  resetBalanceSync(dispatch, newNet, address, currencyCode);
  if (address !== null){
    initiateGetBalance(dispatch, newNet, address, currencyCode);
  }
};

class NetworkSwitch extends Component {
  componentDidMount = () => {
    resetBalanceSync(this.props.dispatch, this.props.net, this.props.address, this.props.currencyCode);
  }

  render = () =>
    <div id="network">
      <span className="transparent">Running on</span>
      <span className="netName" onClick={() => toggleNet(this.props.dispatch, this.props.net, this.props.address, this.props.currencyCode)}>{this.props.net}</span>
    </div>;

}

const mapStateToProps = (state) => ({
  net: state.metadata.network,
  address: state.account.address,
  currencyCode: state.wallet.currencyCode
});

NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

export { NetworkSwitch, initiateGetBalance, syncTransactionHistory, intervals, resetBalanceSync };
