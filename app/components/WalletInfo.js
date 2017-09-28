import React, { Component } from 'react';
import { connect } from 'react-redux';
import Claim from "./Claim.js";
import MdSync from 'react-icons/lib/md/sync';
import QRCode from 'qrcode';
import { initiateGetBalance, intervals } from "../components/NetworkSwitch";
import { resetPrice } from '../modules/wallet';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';
import { clipboard } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import ReactTooltip from 'react-tooltip'

// force sync with balance data
const refreshBalance = (dispatch, net, address) => {
  dispatch(sendEvent(true, "Refreshing..."));
  initiateGetBalance(dispatch, net, address).then((response) => {
    dispatch(sendEvent(true, "Received latest blockchain information."));
    setTimeout(() => dispatch(clearTransactionEvent()), 1000);
  });
};

class WalletInfo extends Component {

  componentDidMount = () => {
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address);
    QRCode.toCanvas(this.canvas, this.props.address, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
  }

  render = () => {
    if (this.props.address !== null){
      return (<div id="accountInfo">
        <div className="label">Your Public Neo Address:</div>
        <div className="address">
          {this.props.address}
            <span className="copyKey" onClick={() => clipboard.writeText(this.props.address)}><Copy data-tip data-for="copyAddressTip" /></span>
        </div>
        <ReactTooltip class="solidTip" id="copyAddressTip" place="bottom" type="dark" effect="solid">
          <span>Copy Public Address</span>
        </ReactTooltip>
        <div className="spacer"></div>
        <div id="balance">
          <div className="split">
            <div className="label">NEO</div>
            <div className="amountBig amountNeo">{this.props.neo}</div>
          </div>
          <div className="split">
            <div className="label">GAS</div>
            <div className="amountBig amountGas">{ Math.floor(this.props.gas * 10000) / 10000 }</div>
          </div>
          <div className="refreshBalance" onClick={() => refreshBalance(this.props.dispatch, this.props.net, this.props.address)} >
            <MdSync id="refresh" data-tip data-for="refreshBalanceTip"/>
            <ReactTooltip class="solidTip" id="refreshBalanceTip" place="bottom" type="dark" effect="solid">
              <span>Refresh account balance</span>
            </ReactTooltip>
          </div>

          <div className="fiat">US {this.props.price}</div>
        </div>
        <div className="spacer"></div>
        <Claim />
        <div className="spacer"></div>
        <div className="qrCode"><canvas id="qrCanvas" ref={(node) => this.canvas = node}></canvas></div>
      </div>);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  price: state.wallet.price
});

WalletInfo = connect(mapStateToProps)(WalletInfo);

export default WalletInfo;
