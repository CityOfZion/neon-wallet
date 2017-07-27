import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { sendAssetTransaction } from '../wallet/api.js';
import { verifyAddress } from '../wallet/index.js';
import { sendEvent, clearTransactionEvent, toggleAsset, showConfirmation, hideConfirmation } from '../actions/index.js';
import SplitPane from 'react-split-pane';


let sendAddress, sendAmount, confirmButton;

const sendTransaction = (dispatch, net, wif, asset) => {
  let assetSwap;
  if (asset === "NEO"){
    assetSwap = "AntShares";
  } else {
    assetSwap = "AntCoins";
  }
  sendAssetTransaction(net, sendAddress.value, wif, assetSwap, sendAmount.value).then((response) => {
    if (response.result === undefined){
      dispatch(sendEvent(false));
    } else {
      dispatch(sendEvent(true));
    }
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
  }).catch((e) => {
    console.log(e)
    // TODO: more specific error messages
    dispatch(sendEvent(false));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
  });
  dispatch(hideConfirmation());
  sendAddress.value = '';
  sendAmount.value = '';
  confirmButton.blur();
};

let Send = ({dispatch, wif, status, ans, anc, net, showConfirmationState, selectedAsset}) => {
  let validateTransaction = () => {
    const validatePublicAddress = verifyAddress(sendAddress.value);
    // console.log(typeof sendAmount.value != 'undefined' , sendAmount.value.length , !isNaN(sendAmount.value));
    const validateAmount = typeof sendAmount.value != 'undefined' && sendAmount.value.length > 0 && !isNaN(sendAmount.value) && parseInt(sendAmount.value) > 0; // TO DO: need to clarify max/min number & decimals for ANS and ANC
    if (validatePublicAddress && validateAmount) {
      dispatch(showConfirmation())
    } else {
      dispatch(hideConfirmation())
    }
  }
  console.log('confirmPane', showConfirmationState)

  let style =  showConfirmationState ? { "showConfirmation": { "display": "block" } } : { "showConfirmation": { "display": "none" } };
  console.log(style.showConfirmation.display)
  let sendAssetName = `Send ${selectedAsset}`;


  let confirmPaneClosed = "69%";
  return (<SplitPane className="confirmSplit" split="horizontal" size={confirmPaneClosed} allowResize={false}>
    <div id="sendPane">
      <div id="sendAddress">
        <input placeholder="Where to send the asset (address)" ref={node => {sendAddress = node;}}/>
      </div>
      <div id="sendAmount">
        <input id="sendAmount" placeholder="Amount" ref={node => {sendAmount = node;}}/>
      </div>
      <button id="sendAsset" onClick={() => dispatch(toggleAsset())}>{selectedAsset}</button>
      <button id="doSend" onClick={validateTransaction}>{sendAssetName}</button>
    </div>
    <div id="confirmPane">
      <button style={style.showConfirmation} id="sendConfirmation" onClick={() => sendTransaction(dispatch, net, wif, selectedAsset)} ref={node => {confirmButton = node;}}>Confirm Transaction</button>
    </div>
  </SplitPane>);
}

const mapStateToProps = (state) => ({
  wif: state.account.wif,
  net: state.wallet.net,
  ans: state.wallet.ANS,
  anc: state.wallet.ANC,
  selectedAsset: state.transactionState.selectedAsset,
  showConfirmationState: state.dashboard.showConfirmation,
});

Send = connect(mapStateToProps)(Send);

export default Send;
