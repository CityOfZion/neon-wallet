import React from 'react';
import { connect } from 'react-redux';
import { claimAllGAS } from '../wallet/api.js';
import { sendEvent, clearTransactionEvent } from '../actions/index.js';

const doGasClaim = (dispatch, net, wif) => {
  dispatch(sendEvent(true, "Processing..."));
  claimAllGAS(net, wif).then((response) => {
    if (response.result === true){
      dispatch(sendEvent(true, "Claim was successful! Your balance will update once the blockchain has processed it."))
    } else {
      dispatch(sendEvent(false, "Claim failed"))
    }
    console.log(response);
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
  });
}

let Claim = ({dispatch, claimAmount, wif, net}) =>
  <div id="claim">
    <button onClick={() => doGasClaim(dispatch, net, wif)}>Claim {claimAmount} GAS</button>
  </div>;

const mapStateToProps = (state) => ({
  claimAmount: state.wallet.claimAmount,
  wif: state.account.wif,
  net: state.wallet.net,
});

Claim = connect(mapStateToProps)(Claim);

export default Claim;
