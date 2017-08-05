import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doClaimAllGas, doSendAsset } from '../wallet/api.js';
import { sendEvent, clearTransactionEvent, setClaimRequest, disableClaim } from '../actions/index.js';
import ReactTooltip from 'react-tooltip'

const doGasClaim = (dispatch, net, wif, selfAddress, ans) => {
  dispatch(sendEvent(true, "Sending Neo to Yourself..."));
  doSendAsset(net, selfAddress, wif, "Neo", ans).then((response) => {
    if (response.result === undefined){
      dispatch(sendEvent(false, "Transaction failed!"));
    } else {
      dispatch(sendEvent(true, "Waiting for transaction to clear..."));
      dispatch(setClaimRequest(true));
      dispatch(disableClaim(true));
    }
  });
}

class Claim extends Component {

  componentDidUpdate = () => {
    console.log(this.props);
    if (this.props.claimRequest === true && this.props.claimWasUpdated == true){
      this.props.dispatch(setClaimRequest(false));
      doClaimAllGas(this.props.net, this.props.wif).then((response) => {
        if (response.result === true){
          this.props.dispatch(sendEvent(true, "Claim was successful! Your balance will update once the blockchain has processed it."));
          setTimeout(() => this.props.dispatch(disableClaim(false)), 60000);
        } else {
          this.props.dispatch(sendEvent(false, "Claim failed"))
        }
        setTimeout(() => this.props.dispatch(clearTransactionEvent()), 5000);
      });
    }
  }

  render = () => {
    let renderButton;
    const doClaim = () => doGasClaim(this.props.dispatch, this.props.net, this.props.wif, this.props.address, this.props.ans);
    if (this.props.disableClaimButton === false){
      renderButton = <button onClick={doClaim}>Claim {this.props.claimAmount} GAS</button>;
    } else {
      renderButton = (<div>
          <button data-tip data-for="claimTip" className="disabled">Claim {this.props.claimAmount} GAS</button>
          <ReactTooltip class="solidTip" id="claimTip" place="bottom" type="dark" effect="solid">
            <span>You can claim Gas once every 5 minutes</span>
          </ReactTooltip>
        </div>);
    }
    return <div id="claim">{renderButton}</div>;
  }

}

const mapStateToProps = (state) => ({
  claimAmount: state.wallet.claimAmount,
  claimRequest: state.wallet.claimRequest,
  claimWasUpdated: state.wallet.claimWasUpdated,
  disableClaimButton: state.wallet.disableClaimButton,
  wif: state.account.wif,
  address: state.account.address,
  net: state.wallet.net,
  ans: state.wallet.ANS
});

Claim = connect(mapStateToProps)(Claim);

export default Claim;
