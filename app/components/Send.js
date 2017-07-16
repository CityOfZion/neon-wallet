import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { sendAssetTransaction } from '../wallet/api.js';
import { sendEvent, clearTransactionEvent, toggleAsset } from '../actions/index.js';


let sendAddress, sendAmount;

const sendTransaction = (dispatch, net, wif, asset) => {
  let assetSwap;
  if (asset === "NEO"){
    assetSwap = "AntShares";
  } else {
    assetSwap = "AntCoins";
  }
  sendAssetTransaction(net, sendAddress.value, wif, assetSwap, sendAmount.value).then((response) => {
    dispatch(sendEvent(response.result));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    sendAddress.value = '';
    sendAmount.value = '';
  });
};

let Send = ({dispatch, wif, status, ans, anc, net, selectedAsset}) =>
  <div id="sendPane">
      <div id="sendAddress">
        <input placeholder="Where to send the asset (address)" ref={node => {sendAddress = node;}}/>
      </div>
      <div id="sendAmount">
        <input id="sendAmount" placeholder="Amount" ref={node => {sendAmount = node;}}/>
      </div>
      <button id="sendAsset" onClick={() => dispatch(toggleAsset())}>{selectedAsset}</button>
    <button id="doSend" onClick={() => sendTransaction(dispatch, net, wif, selectedAsset)}>Send Asset</button>
  </div>

const mapStateToProps = (state) => ({
  wif: state.account.wif,
  net: state.wallet.net,
  ans: state.wallet.ANS,
  anc: state.wallet.ANC,
  selectedAsset: state.transactionState.selectedAsset
});

Send = connect(mapStateToProps)(Send);

export default Send;
