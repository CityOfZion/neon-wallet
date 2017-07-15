import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { sendAssetTransaction } from '../wallet/api.js';
import { sendEvent, clearTransactionEvent } from '../actions/index.js';


let sendAddress, sendAsset, sendAmount;

const sendTransaction = (dispatch, net, wif) => {
  console.log(sendAddress.value, sendAsset.value, sendAmount.value);
  sendAssetTransaction(net, sendAddress.value, wif, sendAsset.value, sendAmount.value).then((response) => {
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
    <div className="title">Transfer</div>
    <div className="margin10">There are <b>{ans}</b> AntShares and <b>{anc}</b> Antcoins available to send.</div>
    <div className="margin10">
      <input id="sendAddress" placeholder="Where to send the asset (address)" ref={node => {sendAddress = node;}}/>
      <select id="sendAsset" ref={node => {sendAsset = node;}}>
        <option>AntShares</option>
        <option>AntCoins</option>
      </select>
      <input id="sendAmount" placeholder="Amount" ref={node => {sendAmount = node;}}/>
    </div>
    <TransactionStatus status={status} />
    <button onClick={() => sendTransaction(dispatch, net, wif)}>Send Asset</button>
    <div className="margin10">
      <button onClick={() => dispatch(clearTransactionEvent())}>
        <Link to="/balance">Back to Balance</Link>
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
