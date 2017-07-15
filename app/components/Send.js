import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { sendAssetTransaction } from '../wallet/api.js';
import { sendEvent, clearTransactionEvent } from '../actions/index.js';


let sendAddress, sendAsset, sendAmount;

const sendTransaction = (dispatch, net, wif) => {
  let assetValue;
  if (sendAsset.checked === true){
    assetValue = "AntShares";
  }
  else {
    assetValue = "AntCoins"
  }
  console.log(sendAddress.value, assetValue, sendAmount.value);
  sendAssetTransaction(net, sendAddress.value, wif, assetValue, sendAmount.value).then((response) => {
    dispatch(sendEvent(response.result));
  });
};

const TransactionStatus = ({status}) => {
  let message = null;
  if (status === true){
    message = <div className="margin10">Transaction complete!</div>;
  }
  else if (status === false){
    message = <div className="margin10">Transaction failed</div>;
  }
  return message;
};

let Send = ({dispatch, wif, status, ans, anc, net}) =>
  <div id="sendPage">
    <div className="title">Send</div>
    <div className="sendForm">
      <input id="sendAddress" placeholder="Where to send the asset (address)" ref={node => {sendAddress = node;}}/>
      <div id="sendAsset">
        <input id="b" type="checkbox" ref={node => {sendAsset = node;}} />
        <label htmlFor="b">
          <div className="can-toggle__switch" data-checked="NEO" data-unchecked="Gas" />
        </label>
      </div>
      <input id="sendAmount" placeholder="Amount" ref={node => {sendAmount = node;}}/>
    <TransactionStatus status={status} />
    <button onClick={() => sendTransaction(dispatch, net, wif)} className="sendButton">Send Asset</button>
    <button onClick={() => dispatch(clearTransactionEvent())} className="sendButton">
      Cancel Transaction
    </button>
    </div>
  </div>

const mapStateToProps = (state) => ({
  wif: state.account.wif,
  status: state.transactionState.success,
  net: state.wallet.net,
  ans: state.wallet.ANS,
  anc: state.wallet.ANC
});

Send = connect(mapStateToProps)(Send);

export default Send;
